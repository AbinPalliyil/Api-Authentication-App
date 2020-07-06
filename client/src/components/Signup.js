import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import CustomInput from './CustomInput';
import * as actions from '../actions';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
		this.responseFacebook = this.responseFacebook.bind(this);
		this.responseGoogle = this.responseGoogle.bind(this);
	}

	async onSubmit(formdata) {
		await this.props.signUp(formdata);
		if (!this.props.errorMessage) {
			this.props.history.push('/dashboard');
		}
	}
	async responseFacebook(res) {
		await this.props.facebookSignUp(res.accessToken);
		if (!this.props.errorMessage) {
			this.props.history.push('/dashboard');
		}
	}
	responseGoogle(res) {
		console.log(res.tokenObj.access_token);
		this.props.googleSignUp(res.tokenObj.access_token);
	}
	render() {
		const { handleSubmit } = this.props;
		return (
			<div className='row'>
				<div className='col'>
					<form onSubmit={handleSubmit(this.onSubmit)}>
						<fieldset>
							<Field
								type='text'
								name='email'
								id='email'
								label='Enter your email'
								component={CustomInput}
								placeholder='example@example.com'
							/>
						</fieldset>
						<fieldset>
							<Field
								type='password'
								name='password'
								label='Enter your password'
								id='password'
								component={CustomInput}
							/>
						</fieldset>
						{this.props.errorMessage && (
							<div className='alert alert-danger'>
								{this.props.errorMessage.message}
							</div>
						)}
						<button className={'btn btn-primary'} type='submit'>
							Sign Up
						</button>
					</form>
				</div>
				<div className='col'>
					<div className='text-center'>
						<div className='alert alert-primary'>
							Or Sign up using third part
						</div>
						<FacebookLogin
							appId='2505446886344494'
							autoLoad={true}
							textButton='Facebook'
							fields='name,email,picture'
							callback={this.responseFacebook}
							cssClass='btn btn-outline-primary'
						/>
						<GoogleLogin
							clientId='668837198121-mleeranceitt11gr0vie40h198a9vcf1.apps.googleusercontent.com'
							buttonText='Google'
							onSuccess={this.responseGoogle}
							onFailure={this.responseGoogle}
							className='btn btn-outline-danger'
						/>
					</div>
				</div>
			</div>
		);
	}
}

const mapStatesToProps = (state) => ({
	errorMessage: state.auth.errorMessage,
});

export default compose(
	connect(mapStatesToProps, actions),
	reduxForm({ form: 'signup' }),
)(Signup);
