import axios from 'axios';

const api = () => {
    const AUTH_TOKEN = `Bearer ${localStorage.getItem("token")}`;
    if(AUTH_TOKEN != "Bearer null"){
        axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
        console.log("From API: ", AUTH_TOKEN);
    }
    let api = axios.create({
        baseURL: process.env.REACT_APP_PROD ? process.env.REACT_APP_API_URL : 'http://localhost:5000/', 
        responseType: 'json',
    });
    return api;
  /*function updateBearer(token) {
        console.log("From updateBearer: ", token);
        axios.defaults.headers.common['Authorization'] = token;
        api = axios.create({
            baseURL: process.env.REACT_APP_PROD ? process.env.REACT_APP_API_URL : 'http://localhost:5000/', 
            responseType: 'json',
        });
    }*/
    
    
}
export default api;
