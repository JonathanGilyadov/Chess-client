import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import styled from 'styled-components';
import Typed from 'react-typed';
import './Login.css';

const LoginContainer = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	width: 500px;
`;

const Title = styled.h1`
	color: white;
`;

const Login = () => {
	const [name, setName] = useState('');
	const [isRedirect, setIsRedirect] = useState(null);

	const handleSubmit = () => {
		setIsRedirect(true);
	};

	return (
		<Fragment>
			{isRedirect && <Redirect to={`/dashboard?username=${name}`} />}
			<LoginContainer>
				<Title>
					<Typed
						strings={[
							'Type your nickname',
							'What friends call you',
							'How you will be recognized',
						]}
						typeSpeed={40}
						backSpeed={50}
						loop
					/>
				</Title>
				<div class="form__group field">
					<input
						type="input"
						className="form__field"
						placeholder="Hello"
						name="hello?"
						id="name"
						onChange={(e) => setName(e.target.value)}
						value={name}
					/>
					<label htmlFor="name" className="form__label"></label>
				</div>
				<div id="buttons" onClick={handleSubmit}>
					<a className="button">Button</a>
				</div>
			</LoginContainer>
		</Fragment>
	);
};

export default Login;
