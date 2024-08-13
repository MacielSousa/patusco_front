import axios from "axios";
process.env.URL_BASE_BACKEND_PATUSO;
const axiosInstance = axios.create({
    baseURL: process.env.URL_BASE_BACKEND_PATUSO ?? 'http://localhost/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosInstance;