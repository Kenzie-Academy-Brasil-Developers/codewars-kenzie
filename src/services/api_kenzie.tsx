import axios from 'axios';

const api_kenzie = axios.create({
  baseURL: "https://codecodewars.herokuapp.com/api",
});

export default api_kenzie;