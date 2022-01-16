import axios from 'axios';

const api_kenzie = axios.create({
  baseURL: "https://codecodewars.herokuapp.com/api",
  timeout: 20000
});

export default api_kenzie;