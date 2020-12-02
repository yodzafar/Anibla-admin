import axios, {execute} from ".";

export default {
    getAllComments: () => execute(axios.get('/comment/all')),
    removeComment: (id) => execute(axios.delete(`/comment/${id}`)),
    updateComment: ({id, data}) => execute(axios.put(`/comment/${id}`, data))
}