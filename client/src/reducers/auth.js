import {AUTH_SIGN_UP, AUTH_ERROR} from '../actions/type'
const DEFAULT_STATE = {
	isAuthenticated: false,
	token: '',
	errorMessage: '',
};
export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
        case 'AUTH_SIGN_UP':
            return {
    
                    ...state,
                    token: action.payload,
                    isAuthenticated: true,
                    errorMessage: ''
                }
            
        case 'AUTH_ERROR':
            return{
                ...state,
                token: '',
                isAuthenticated: false,
                errorMessage: action.payload
            }
            
    
        default:
            return state;
    }
};
