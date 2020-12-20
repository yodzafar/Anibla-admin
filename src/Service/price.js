import axios, {execute} from ".";

export default {
    getAllPriceList: () => execute(axios.get('/pricelist')),
    removePrice: (id) => execute(axios.delete(`/pricelist/${id}`)),
    addPrice: (data) => execute(axios.post('/pricelist', data)),
    getPrice: (id) => execute(axios.get(`/pricelist/${id}`)),
    updatePrice: ({id, data}) => execute(axios.put(`/pricelist/${id}`, data))
}