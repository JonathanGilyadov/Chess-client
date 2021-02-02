import React, { useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';

const Login = () => {
  const [name, setName] = useState('');
  const [isRedirect, setIsRedirect] = useState(null);

  const handleSubmit = () => {
    setIsRedirect(true);
  };

  return (
    <div>
      {isRedirect && <Redirect to={`/dashboard?username=${name}`} />}
      <div className='form-group'>
        <label htmlFor=''>Name</label>
        <input
          type='text'
          className='form-control'
          name='name'
          id=''
          placeholder='Enter your name'
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <button className='btn' onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default Login;
