import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_PROD ? process.env.REACT_APP_API_URL : 'http://localhost:5000/', 
    responseType: 'json',
    headers: {
        'Authorization': localStorage.getItem("token") !== null ? `Bearer ${localStorage.getItem("token").replace(/['"]+/g, '')}` : null
    }
});

export default api;