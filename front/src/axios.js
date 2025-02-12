import axios from 'axios';

const defaultOptions = {
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};



const instance = axios.create(defaultOptions);

console.log(instance.defaults.baseURL);

export default instance;