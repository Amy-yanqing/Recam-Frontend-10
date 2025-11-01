import api from "../config/axios";

export const login= (data) =>api.post("/api/Users/Login",data);

export const getAllAgents = ()=>{return api.get("/api/Users/GetAllAgent")};

export const getAllPhotographyCompany = ()=>{return api.get("/api/Users/GetAllPhotographyCompany")}