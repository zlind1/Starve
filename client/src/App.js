import React from 'react';
import {Route, Link} from 'react-router-dom';

export default function App() {
  return (
    <div className='App'>
      <Route exact path='/'>
        <h1>Home page</h1>
        <Link to='/login'>Login</Link>
      </Route>
      <Route exact path='/login'>
        <h1>Login page</h1>
        <Link to='/'>Home</Link>
      </Route>
    </div>
  );
}
