from flask import Flask, make_response, request
from flask_restful import Api, Resource
from flask_cors import CORS
import json, boto3

def format_response(body, success=True):
    return make_response(
        {'body': body, 'success': success},
        200,
        {'content-type': 'application/json'}
    )
def bad_response(body):
    return format_response(body, False)

app = Flask(__name__)
CORS(app)
api = Api(app)
db = boto3.resource('dynamodb')
users = db.Table('zlind-starve-users')

@api.resource('/users', '/users/<username>')
class Users(Resource):
    def get_user(self, username):
        user = users.get_item(Key={'username': username})
        if 'Item' in user:
            return user['Item']
        return False
    def get_users(self):
        return users.scan()['Items'];

    # GET /users, /users/<username>
    def get(self, username=None):
        if username:
            user = self.get_user(username)
            if user:
                return format_response(user)
            return bad_response('user not found')
        current_users = self.get_users()
        return format_response(current_users)
    # POST /users/<username> {action, password}
    # action: login/signup
    def post(self, username=None):
        if not username:
            return bad_response('POST needs username')
        data = request.json
        action = data['action']
        password = data['password']
        user = self.get_user(username)
        if action == 'signup':
            if user:
                return bad_response('username taken')
            users.put_item(Item={'username': username, 'password': password})
            return format_response('user added')
        if user:
            if user['password'] == password:
                return format_response('login success')
            return bad_response('wrong password')
        return bad_response('username not found')

if __name__ == '__main__':
    app.run()
