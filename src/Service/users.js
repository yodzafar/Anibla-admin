import axios, { execute } from '.';

export default {
  getUser: (id) => execute(axios.post(`/users/${id}`)),
  getUsersList: () => execute(axios.get('/users'))
};