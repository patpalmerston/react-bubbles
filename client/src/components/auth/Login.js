import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ history }) => {
	const [user, setUser] = useState({
		username: '',
		password: ''
	});

	function handleChanges(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}

	const onSubmit = e => {
		e.preventDefault();
		axios
			.post('http://localhost:5000/api/login', user)
			.then(res => {
				console.log(res);
				localStorage.setItem('token', res.data.payload);
				history.push('/bubbles');
			})
			.catch(err => console.log('Your Error is a', err.message));
	};

	return (
		<form onSubmit={onSubmit}>
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
