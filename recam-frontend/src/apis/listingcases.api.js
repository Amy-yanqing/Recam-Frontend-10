import api from "../config/axios";

//Create ListingCase
export const createListing = (data) => { return api.post("/api/ListingCase/create", data) };

//Get all ListingCase by role

export const getAllListings = (params) => {
    return api.get("/api/ListingCase", { params })
};

export const updateListing = (listingCaseId, data) => { return api.patch(`/api/ListingCase/${listingCaseId}`, data) };

export const getListingById = (listingCaseId) => { return api.get(`api/ListingCase/${listingCaseId}`) }



export const deleteListingById = (listingCaseId) => { return api.delete(`api/ListingCase/${listingCaseId}`) }
