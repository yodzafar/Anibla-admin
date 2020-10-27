import axios, { execute } from './index';

export default {
  createGenre: (data) => execute(axios.post('/janr', data)),
  getAllGenre: () => execute(axios.get('/janr')),
  getGenre: (id) => execute(axios.get(`/janr/${id}`)),
  updateGenre: (id, data) => execute(axios.put(`/janr/${id}`, data)),
  removeGenre: (id) => execute(axios.delete(`/janr/${id}`))
}
