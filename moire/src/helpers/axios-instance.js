import axios from 'axios';

const API_BASE_URL = 'https://vue-moire.skillbox.cc/api';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
});

export default axiosInstance;
