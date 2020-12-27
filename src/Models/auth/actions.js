import {AUTH_ACTION_TYPES} from '../../Constants/action-types/auth';
import auth from '../../Service/auth';

export const logout = () => ({type: AUTH_ACTION_TYPES.AUTH_LOGOUT})
export const login = (token) => ({type: AUTH_ACTION_TYPES.AUTH_LOGIN, token})
export const authMe = () => async (dispatch) => {
    try {
        const res = await auth.authMe()
        if(res.data) {
            dispatch({type: AUTH_ACTION_TYPES.AUTH_ME, data: res.data})
        }else {
            localStorage.removeItem('token')
            window.location.replace('/sign-in')
        }

    } catch (e) {
        console.log(e);
    }
}
