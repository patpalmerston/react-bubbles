import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import PrivateRoute from './components/routing/PrivateRoute';
import Login from './components/Login';
import BubblesPage from './components/BubblePage';
import './styles.scss';

function App() {
	const [colorList, setColorList] = useState([]);
	return (
		<Router>
			<div className='App'>
				<Route exact path='/login' component={Login} />

				<PrivateRoute exact path='/' component={BubblesPage} />
			</div>
		</Router>
	);
}

export default App;
