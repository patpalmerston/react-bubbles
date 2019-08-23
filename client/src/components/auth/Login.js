import React, { useState } from 'react';

const Login = props => {
	const [user, setUser] = useState({
		username: '',
		password: ''
	});

	function handleChanges(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
		console.log('form', user);
	}

	return (
		<form
			onSubmit={e => {
				e.preventDefault();
				props.submitUser();
			}}
		>
			<input
				type='text'
				name='username'
				placeholder='username'
				value={user.username}
				onChange={handleChanges}
			/>
			<input
				type='text'
				name='password'
				placeholder='password'
				value={user.password}
				onChange={handleChanges}
			/>
			<button>Login</button>
		</form>
	);
};

export default Login;
