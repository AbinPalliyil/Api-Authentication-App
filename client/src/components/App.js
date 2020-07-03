import React from 'react';
import Header from './Header';

function App(props) {
	return (
		<div className='App'>
			<Header />
			<div className='container'>{props.children}</div>
		</div>
	);
}

export default App;
