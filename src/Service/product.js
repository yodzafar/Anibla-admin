import axios, { execute } from '.';

export default {
  createProduct: (data) => execute(axios.post('/kino/add', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })),
  getAllProduct: (params) => execute(axios.get('/kino/all', { params })),
  getProduct: (id) => execute(axios.get(`/kino/${id}`)),
  updateProduct: ({ id, data }) => execute(axios.put(`/kino/${id}`, data)),
  removeProduct: (id) => execute(axios.delete(`/kino/${id}`)),
  createSeason: (data) => execute(axios.post('/season/add', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })),
  updateSeason: ({ id, data }) => execute(axios.put(`/season/${id}`, data)),
  getSeason: (id) => execute(axios.get(`/season/${id}`)),
  removeSeason: (id) => execute(axios.delete(`/season/${id}`)),
  createSeries: (data) => execute(axios.post('/season/seriya/add', data)),
  updateSeries: ({ id, data }) => execute(axios.put(`/season/seriya/${id}`, data)),
  removeSeries: (id) => execute(axios.delete(`/season/seriya/${id}`)),
  getAllSeason: () => execute(axios.get('/season/all'))
}
