import siteActionTypes from '../../Constants/action-types/site'
import auth from "../../Service/auth";

export const logout = () => ({type: siteActionTypes.AUTH_LOGOUT})
export const login = (token) => ({type: siteActionTypes.AUTH_LOGIN, token})
export const authMe = () => async dispatch => {
  try {
    const res = await auth.authMe()
    dispatch({type: siteActionTypes.AUTH_ME, data: res.data})
  } catch (e) {
    console.log(e);
  }
}