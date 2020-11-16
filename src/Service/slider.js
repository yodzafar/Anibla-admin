import axios, {execute} from "./index";

export default {
    createSlider: (data) => execute(axios.post('/slider/add', data)),
    getAllSlider: () => execute(axios.get('/slider/admin')),
    removeSlider: (id) => execute(axios.delete(`slider/${id}`))
}