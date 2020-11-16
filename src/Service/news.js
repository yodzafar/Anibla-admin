import axios, {execute} from ".";

export default {
    createNews: (data) => execute(axios.post('/news/add', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    })),
    getAllNews: () => execute(axios.get('/news/all')),
    removeNews: (id) => execute(axios.delete(`/news/${id}`))
}