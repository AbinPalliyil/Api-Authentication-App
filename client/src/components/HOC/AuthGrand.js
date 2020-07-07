import React, { Component } from 'react';
import { connect } from 'react-redux';

export default (OrginalComponent) => {
	class MixedComponent extends Component {
		constructor(props){
			super(props);
		}
		checkAuth() {
			if (!this.props.isAuthenticated && !this.props.token) {
				this.props.history.push('/');
			}
		}
		componentDidMount() {
			this.checkAuth();
		}
		componentDidUpdate() {
			this.checkAuth();
		}
		render() {
			return <OrginalComponent {...this.props}/>;
		}
	}

	const mapStateToProps = (state) => ({
		isAuthenticated: state.auth.isAuthenticated,
		token: state.auth.token,
	});

	return connect(mapStateToProps, null)(MixedComponent);
};
