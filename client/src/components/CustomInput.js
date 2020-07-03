import React, { Component } from 'react';

class CustomInput extends Component {
	render() {
		const {
			input: { value, onChange },
			name,
			placeholder,
			id,
			label,
			type,
		} = this.props;

		return (
			<div className='form-group'>
				<label htmlFor={id}>{label}</label>
				<input
					type={type}
					id={id}
					name={name}
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					className='form-control'
				/>
			</div>
		);
	}
}

export default CustomInput;
