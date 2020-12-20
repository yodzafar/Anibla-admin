import axios, { execute } from '.';

export default {
  createCategory: (data) => execute(axios.post('/category/', data)),
  getAllCategory: () => execute(axios.get('/category/')),
  getCategory: (id) => execute(axios.get(`/category/${id}/`)),
  updateCategory: (id, data) => execute(axios.put(`/category/${id}/`, data)),
  removeCategory: (id) => execute(axios.delete(`/category/${id}/`))
}
