import axios from 'axios';

axios.defaults.headers.common['Access-Control-Allow-Origin'] = true;
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:8081/';


const httpClient = axios.create({
    baseURL: "https://localhost:44342/api/",
    headers: {
        "Content-Type": "application/json"
    }
});

export default httpClient;