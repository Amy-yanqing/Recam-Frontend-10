import api from "../config/axios";

//Create ListingCase
export const createListing = (data)=>{return api.post("/api/ListingCase/create",data)}

//Get all ListingCase by role

export const getAllListings = ()=>{return api.get("/api/ListingCase")};

