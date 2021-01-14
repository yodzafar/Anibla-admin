import axios, {execute} from ".";

export default {
    getAllPayment : () => execute(axios.get('payment/all')),
    getAllSold : () => execute(axios.get('/balance'))
}