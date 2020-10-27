import axios, { execute } from '.';

export default {
  createProduct: (data) => execute(axios.post('/kino/add/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })),
  getAllProduct: () => execute(axios.get('/kino/all'))
}
