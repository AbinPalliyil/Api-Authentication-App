import React, { Component } from 'react';
import { Link} from 'react-router-dom'
import PropTypes from 'prop-types';

class Header extends Component {
	render() {
		return (
			<nav className='navbar navbar-expand-lg navbar-dark bg-dark' style={{marginBottom: '30px'}}>
				<a className='navbar-brand'>Dn-Army</a>
				<div className="collapse navbar-collapse">
					<ul className='navbar-nav mr-auto'>
						<li className='nav-item'>
                            <Link className="nav-link" to='/dashboard'>Dashboard</Link>
						</li>
					</ul>
					<ul className='nav navbar-nav ml-auto'>
						<li className='nav-item'>
                        <Link className="nav-link" to='/signup'>Sign Up</Link>

						</li>
						<li className='nav-item'>
                        <Link className="nav-link" to='/signin'>Sign In</Link>

						</li>
						<li className='nav-item'>
                        <Link className="nav-link" to='/signout'>Sign Out</Link>

						</li>
					</ul>
				</div>
			</nav>
		);
	}
}

export default Header;