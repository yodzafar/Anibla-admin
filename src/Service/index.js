/* eslint-disable no-param-reassign */
import axios from 'axios';

const baseURL = process.env.REACT_APP_SERVICE_URL || '/api';

const Axios = {
  _instance: null,
  get instance() {
    if (!this._instance) {
      this._instance = axios.create({
        baseURL
      });
    }
    return this._instance;
  }
};

Axios.instance.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error && error.response && error.response.status === 401) {
      window.location.replace('/sign-in');
      localStorage.removeItem('token')
    }
    return Promise.reject(error);
  }
);

Axios.instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function execute(promise) {
  return new Promise((resolve, reject) => {
    promise.then((response) => {
      resolve(response.data);
    }).catch(reject);
  });
}

export default Axios.instance;
