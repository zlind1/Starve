import React from 'react';
import {Link} from 'react-router-dom';
import {GET} from '../api';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }
  componentDidMount() {
    GET('/users').then(response => {
      if (response.success) this.setState({users: response.body});
    });
  }
  render() {
    return (
      <>
        <ul>
          {this.state.users ? this.state.users.map(user => (
            <li key={user.username}>
              {user.username+': '+user.password}
            </li>
          )) : ''}
        </ul>
        <Link to='/login'>Login</Link>
      </>
    );
  }
}
