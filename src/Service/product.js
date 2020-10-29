import axios, { execute } from '.';

export default {
  createProduct: (data) => execute(axios.post('/kino/add/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })),
  getAllProduct: (params) => execute(axios.get('/kino/all', { params })),
  getProduct: (id) => execute(axios.get(`/kino/${id}`)),
  removeProduct: (id) => execute(axios.delete(`/kino/${id}`))
}
