import api from "../config/axios";
export const login= (data) =>api.post("/api/Users/Login",data);