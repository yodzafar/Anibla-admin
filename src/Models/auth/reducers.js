import siteActionTypes from '../../Constants/action-types/site'

const defaultState = {
  token: localStorage.getItem('token')
};

const map = {
  [siteActionTypes.AUTH_LOGIN]: (state, { token }) => {
    localStorage.setItem('token', token);
    window.location.replace('/');
    return ({ ...state, token });
  },
  [siteActionTypes.AUTH_LOGOUT]: (state) => {
    localStorage.removeItem('token');
    return { ...state, token: '' };
  }
};

export default (state = defaultState, action) => (map[action.type] && map[action.type](state, action)) || state;