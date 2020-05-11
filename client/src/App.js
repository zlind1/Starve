import React from 'react';
import {Route} from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

export default function App() {
  return (
    <div className='App'>
      <Route exact path='/'>
        <h1>Home page</h1>
        <Home />
      </Route>
      <Route exact path='/login'>
        <h1>Login page</h1>
        <Login />
      </Route>
    </div>
  );
}
