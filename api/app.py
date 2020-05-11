from flask import Flask, make_response
from flask_restful import Api, Resource
from flask_cors import CORS
import json, boto3

def bad_response(msg):
    return make_response(
        json.dumps({'success': False, 'msg': msg}),
        200,
        {'content-type': 'application/json'}
    )

def ok_response(msg):
    return make_response(
        json.dumps({'success': True, 'msg': msg}),
        200,
        {'content-type': 'application/json'}
    )

app = Flask(__name__)
CORS(app)
api = Api(app)
db = boto3.resource('dynamodb')
users = db.Table('zlind-starve-users')

@api.resource('/users', '/users/<username>')
class Users(Resource):
    def get(self, username=None):
        if username:
            user = users.get_item(Key={'username': username})
            if 'Item' not in user:
                return bad_response('user not found')
            return ok_response(user['Item'])
        allUsers = users.scan()['Items'];
        return ok_response(allUsers)

if __name__ == '__main__':
    app.run()
