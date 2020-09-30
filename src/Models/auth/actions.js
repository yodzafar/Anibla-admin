import siteActionTypes from '../../Constants/action-types/site'

export const logout = () => ({type: siteActionTypes.AUTH_LOGOUT })
export const login = (token) => ({type: siteActionTypes.AUTH_LOGIN, token})