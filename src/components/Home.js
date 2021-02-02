import React, { Fragment, useEffect, useState } from 'react';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { io } from 'socket.io-client';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';

import { useQuery } from '../hooks';
import Chess from './Chess';
import Users from './Users';

let socket;

const Home = () => {
  const query = useQuery();
  let { path, url } = useRouteMatch();

  const username = query.get('username');
  const SERVER = 'http://localhost:8080/';

  useEffect(() => {
    socket = io(SERVER);

    socket.on('message', (message) => {
      console.log(message);
      NotificationManager.info(message);
    });

    socket.emit('joinRoom', { username });
  }, []);

  return (
    <Fragment>
      <NotificationContainer />

      <ul>
        welcome {username}
        <li>
          <Link to={`${url}/chess?username=${username}`}>play</Link>
        </li>
        <li>
          <Link to={`${url}/users?username=${username}`}>Users</Link>
        </li>
      </ul>
      <Switch>
        <Route path={`${path}/chess`} component={Chess} />
        <Route path={`${path}/users`} component={Users} />
      </Switch>
    </Fragment>
  );
};

export default Home;
