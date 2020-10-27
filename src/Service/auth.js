import axios, { execute } from '.';

export default {
  getToken: ({ email, password }) => execute(axios.post('/auth/login', { email, password })),
  authMe: () => execute((axios.get('/auth/me')))
};
