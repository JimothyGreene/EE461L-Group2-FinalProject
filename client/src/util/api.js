import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/',
    responseType: 'json',
    auth: localStorage.getItem("token") !== null ? `Bearer ${localStorage.getItem("token").replace(/['"]+/g, '')}` : null
});

export default api;