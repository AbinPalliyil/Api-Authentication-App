import axios from 'axios';

import {AUTH_SIGN_UP, AUTH_ERROR} from './type'


export const signUp = data => {
    return async (dispatch) => {
        try {
                const res = await axios.post('http://localhost:5000/users/signup', data);
               console.log({res})
                if(res.data.token) {
                    dispatch({
                        type: AUTH_SIGN_UP,
                        payload: res.data.token
                    });
                    localStorage.setItem('JWT_TOKEN', res,data.token)
                }

        } catch (error) {
          const errMessage = error.response.data ? error.response.data : {message: "Something went wrong"};
           dispatch({
            type: AUTH_ERROR,
            payload: errMessage

        })

        }
    }
}