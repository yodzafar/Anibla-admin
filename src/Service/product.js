import axios, { execute } from '.';

export default {
  createProduct: (data) => execute(axios.post('/kino/add/', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })),
  getAllProduct: (params) => execute(axios.get('/kino/all', { params })),
  getProduct: (id) => execute(axios.get(`/kino/${id}`)),
  updateProduct: ({ id, data }) => execute(axios.put(`/kino/${id}`, data)),
  removeProduct: (id) => execute(axios.delete(`/kino/${id}`)),
  createSeason: (data) => execute(axios.post('/season/add-season', data)),
  updateSeason: ({ id, data }) => execute(axios.put(`/season/season/${id}`, data)),
  getSeason: (id) => execute(axios.get(`/season/season/${id}`)),
  removeSeason: (id) => execute(axios.delete(`/season/season/${id}`)),
  createSeriya: (data) => execute(axios.post('/season/add-seriya', data)),
  updateSeriya: ({ id, data }) => execute(axios.put(`/season/seriya/${id}`, data)),
  removeSeriya: (id) => execute(axios.delete(`/season/seriya/${id}`))
}
