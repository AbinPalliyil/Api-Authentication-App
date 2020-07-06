import axios from 'axios';

import { AUTH_SIGN_UP, AUTH_ERROR, AUTH_SIGN_OUT } from './type';

export const signUp = (data) => {
	return async (dispatch) => {
		try {
			const res = await axios.post(
				'http://localhost:5000/users/signup',
				data,
			);
			if (res.data.token) {
				dispatch({
					type: AUTH_SIGN_UP,
					payload: res.data.token,
				});
				localStorage.setItem('JWT_TOKEN', res, data.token);
			}
		} catch (error) {
			const errMessage = error.response.data
				? error.response.data
				: { message: 'Something went wrong' };
			dispatch({
				type: AUTH_ERROR,
				payload: errMessage,
			});
		}
	};
};

export const googleSignUp = (token) => {
	return async (dispatch) => {
		try {
			const res = await axios.post(
				'http://localhost:5000/users/oauth/google',
				{
					access_token: token,
				},
			);
			if (res.data.token) {
                const token = res.data.token
				dispatch({
					type: AUTH_SIGN_UP,
					payload: token,
				});
				localStorage.setItem('JWT_TOKEN',token);
			}
		} catch (error) {
			const errMessage = error.response.data
				? error.response.data
				: { message: 'Something went wrong' };
			dispatch({
				type: AUTH_ERROR,
				payload: errMessage,
			});
		}
	};
};

export const facebookSignUp = (token) => {
	return async (dispatch) => {
		try {
			const res = await axios.post(
				'http://localhost:5000/users/oauth/facebook',
				{
					access_token: token,
				},
			);
			if (res.data.token) {
                const token = res.data.token
				dispatch({
					type: AUTH_SIGN_UP,
					payload: token,
				});
				localStorage.setItem('JWT_TOKEN',token);
			}
		} catch (error) {
			const errMessage = error.response.data
				? error.response.data
				: { message: 'Something went wrong' };
			dispatch({
				type: AUTH_ERROR,
				payload: errMessage,
			});
		}
	};
};

export const signOut = () => {
    return async (dispatch) => {
        
    localStorage.removeItem("JWT_TOKEN");
    dispatch({
        type: AUTH_SIGN_OUT,
        payload: '',
    })
}
}
