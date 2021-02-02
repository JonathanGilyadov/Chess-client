import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useQuery } from '../hooks';

const Auth = (props) => {
  const query = useQuery();
  console.log(query);
  const username = query.get('username');
  console.log(username, !username);
  if (!username) {
    console.log('redirecting...');
    return <Redirect to='/' />;
  } else {
    return props.children;
  }
};

export default Auth;
