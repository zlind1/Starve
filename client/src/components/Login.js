import React from 'react';
import {Link} from 'react-router-dom';
import {POST} from '../api';

const crypto = require('crypto');
const getHash = (key) => crypto.createHmac('sha256', key).digest('base64');

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.username = React.createRef();
    this.password = React.createRef();
    this.state = {
      newAccount: false
    }
  }
  switchNew = () => {
    this.setState({newAccount: !this.state.newAccount});
  }
  submitForm = (event) => {
    event.preventDefault();
    let username = this.username.current.value;
    let password = getHash(this.password.current.value);
    if (this.state.newAccount) {
      POST('/users/'+username, {action: 'signup', password: password}).then(response => {
        if (response.success) {
          console.log('signup success, route away');
          window.location = '/';
        } else console.log('signup failure: '+response.body);
      });
    } else {
      POST('/users/'+username, {action: 'login', password: password}).then(response => {
        if (response.success) {
          console.log('login success, route away');
          window.location = '/';
        } else console.log('login failure: '+response.body);
      });
    }
  }
  render() {
    return (
      <>
        <form onSubmit={this.submitForm}>
          <input ref={this.username} placeholder='username'/>
          <input ref={this.password} type='password' placeholder='password'/>
          <input type='submit'/>
        </form>
        <br/>
        <Link to='/'>Home</Link>
        <br/>
        {this.state.newAccount ? (
          <p>
            Already have an account? <button onClick={this.switchNew}>Log in</button>
          </p>
        ) : (
          <p>
            No account? <button onClick={this.switchNew}>Sign up</button>
          </p>
        )}
      </>
    );
  }
}
