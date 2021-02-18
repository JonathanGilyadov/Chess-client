import React, { Fragment, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Auth from './components/Auth';
import Home from './components/Home';
import Login from './components/Login';

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
