import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { compose } from 'redux';

import CustomInput from './CustomInput';
import * as actions from '../actions';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(formdata) {
		this.props.signUp(formdata);
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
						<button className='btn btn-primary'>Facebook</button>
						<button className='btn btn-danger'>Gmail</button>
					</div>
				</div>
			</div>
		);
	}
}

export default compose(
	connect(null, actions),
	reduxForm({ form: 'signup' }),
)(Signup);
