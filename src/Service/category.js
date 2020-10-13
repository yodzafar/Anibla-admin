import axios, {execute} from "./index";


export default {
  createCategory : (data) => execute(axios.post('/category', data)),
  getCategoryList: () => execute(axios.get('/category')),
  getCategory: (id) => execute(axios.get(`/category/${id}`)),
  updateCategory: (id, data) => execute(axios.put(`/category/${id}`, data)),
  removeCategory: (id) => execute(axios.delete(`/category/${id}`))
}