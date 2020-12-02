import axios, { execute } from '.';

export default {
  getUser: (id) => execute(axios.get(`/users/${id}`)),
  getUsersList: () => execute(axios.get('/users')),
  removeUser: (id) => execute(axios.delete(`/users/${id}`)),
  updateUser: ({id, data}) => execute(axios.put(`/users/${id}`, data))
};
