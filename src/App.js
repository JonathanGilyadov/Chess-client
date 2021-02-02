import React, { Fragment, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from 'react-router-dom';

import { io } from 'socket.io-client';
import Auth from './components/Auth';
import Chess from './components/Chess';
import Home from './components/Home';
import Landing from './components/Landing';
import Login from './components/Login';
import Users from './components/Users';

const SERVER = 'http://localhost:8080/';

let socket;

const App = () => {
  return (
    <Fragment>
      <Router>
        {/* landing page */}
        <Route path='/' component={Login} exact />
        {/* Board */}
        <Route path='/login' component={Login} />
        <Route path='/dashboard'>
          <Auth>
            <Home />
          </Auth>
        </Route>
      </Router>
    </Fragment>
  );
};

export default App;
