import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { signOut } from '../actions';

class Header extends Component {
	render() {
		const { isAuthenticated } = this.props;
		return (
			<nav
				className='navbar navbar-expand-lg navbar-dark bg-dark'
				style={{ marginBottom: '30px' }}>
				<Link to='/' className='navbar navbar-brand'>
					DN-ARMY
				</Link>
				<div className='collapse navbar-collapse'>
					<ul className='navbar-nav mr-auto'>
						<li className='nav-item'>
							<Link className='nav-link' to='/dashboard'>
								Dashboard
							</Link>
						</li>
					</ul>
					<ul className='nav navbar-nav ml-auto'>
						{!isAuthenticated ? (
							<Fragment>
								<li className='nav-item'>
									<Link className='nav-link' to='/signup'>
										Sign Up
									</Link>
								</li>
								<li className='nav-item'>
									<Link className='nav-link' to='/signin'>
										Sign In
									</Link>
								</li>
							</Fragment>
						) : (
							<li className='nav-item'>
								<Link
									className='nav-link'
									to='/signout'
									onClick={this.props.signOut}>
									Sign Out
								</Link>
							</li>
						)}
					</ul>
				</div>
			</nav>
		);
	}
}

Header.propTypes = {
	isAuthenticated: PropTypes.bool.isRequired,
	signOut: PropTypes.func,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
	signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
