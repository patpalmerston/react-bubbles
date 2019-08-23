import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import PrivateRoute from './components/routing/PrivateRoute';
import Login from './components/auth/Login';
import BubblesPage from './components/BubblePage';
import './styles.scss';

function App(props) {
	const [colorList, setColorList] = useState([]);

	const submitUser = user => {
		axios
			.post('http://localhost:5000/api/login', user)
			.then(res => {
				localStorage.setItem('token', res.data.payload);
				props.history.push('/login');
			})
			.catch(err => console.log(err.message));
	};

	return (
		<Router>
			<div className='App'>
				<Route
					exact
					path='/login'
					render={props => <Login {...props} submitUser={submitUser} />}
				/>

				<PrivateRoute exact path='/' component={BubblesPage} />
			</div>
		</Router>
	);
}

export default App;
