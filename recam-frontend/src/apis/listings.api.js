import api from "../config/axios";

export const createListing = (data)=>{return api.post("/api/ListingCase/create",data)}