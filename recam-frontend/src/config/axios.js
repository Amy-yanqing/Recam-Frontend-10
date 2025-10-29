import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5014",
    headers:{"Content-Type":"application/json"},
})

api.interceptors.response.use(
(res)=>res.data,
(err) => Promise.reject(err.response?.data ||err)
);

export default api;