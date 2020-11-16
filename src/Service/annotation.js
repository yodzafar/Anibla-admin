import axios, {execute} from ".";

export default {
    createAnnotation: (data) => execute(axios.post('/anotatsiya/add', data)),
    getAllAnnotation: () => execute(axios.get('/anotatsiya/all')),
    removeAnnotation: (id) => execute(axios.delete(`/anotatsiya/${id}`)),
    updateAnnotation: ({id, data}) => execute(axios.put(`/anotatsiya/${id}`, data))
}