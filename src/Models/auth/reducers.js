import {AUTH_ACTION_TYPES} from "../../Constants/action-types/auth";

const defaultState = {
  token: localStorage.getItem('token'),
  data: {}
};

const map = {
  [AUTH_ACTION_TYPES.AUTH_LOGIN]: (state, { token }) => {
    localStorage.setItem('token', token);
    window.location.replace('/');
    return ({ ...state, token });
  },
  [AUTH_ACTION_TYPES.AUTH_LOGOUT]: (state) => {
    localStorage.removeItem('token');
    return { ...state, token: '' };
  },
  [AUTH_ACTION_TYPES.AUTH_ME]: (state, {data}) => {
    return {...state, data}
  }
};

export default (state = defaultState, action) => (map[action.type] && map[action.type](state, action)) || state;