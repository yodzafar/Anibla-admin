import axios, { execute } from '.';

export default {
  getToken: ({ email, password, name }) => execute(axios.post('/auth/login', { email, password, name })),
  authMe: () => execute((axios.get('/auth/me')))
};