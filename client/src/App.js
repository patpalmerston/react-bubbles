import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import PrivateRoute from './components/routing/PrivateRoute';
import Login from './components/auth/Login';
import BubblesPage from './components/BubblePage';
import './styles.scss';

function App(props) {
	const [colorList, setColorList] = useState([]);

	

	return (
		<Router>
			<div className='App'>
				<Route
					path='/login'
					render={props => <Login {...props} />}
				/>

				<PrivateRoute path='/bubbles' component={BubblesPage} />
			</div>
		</Router>
	);
}

export default App;
