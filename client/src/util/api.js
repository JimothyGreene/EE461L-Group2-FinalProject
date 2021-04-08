import axios from 'axios';

const AUTH_TOKEN = `Bearer ${localStorage.getItem("token")}`;

axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;

const api = axios.create({
    baseURL: process.env.REACT_APP_PROD ? process.env.REACT_APP_API_URL : 'http://localhost:5000/', 
    responseType: 'json',
});

export default api;