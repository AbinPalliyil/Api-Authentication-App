import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Signin from './components/Signin';
import Signup from './components/Signup';

ReactDOM.render(
	<BrowserRouter>
		<App>
			<Route exact path='/' component={Home} />

			<Route exact path='/dashboard' component={Dashboard} />
			<Route exact path='/signin' component={Signin} />
			<Route exact path='/signup' component={Signup} />
		</App>
	</BrowserRouter>,

	document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
