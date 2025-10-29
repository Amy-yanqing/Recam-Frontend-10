import axios from "axios";
import { authService } from "../services/authService";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5014",
    headers:{"Content-Type":"application/json"},
})

api.interceptors.request.use((config)=>{
    const token = authService.getToken();
    if(token){
        config.headers.Authorization=`Bearer ${token}`;

    }

    return config;

},
(error)=>Promise.reject(error)

);

api.interceptors.response.use(
(res)=>res.data,
(err) => Promise.reject(err.response?.data ||err)
);

export default api;