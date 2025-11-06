import api from "../config/axios";


const mediaAssetApi = {
  // Get all media files for a specific ListingCase
  getMediaByListingId(listingCaseId) {
    return api.get(`/api/ListingCase/${listingCaseId}/media`);
  },

  // Upload media files
  uploadMediaAssets(listingCaseId, files, type) {
    const formData = new FormData();

    // Add files to the request body
    files.forEach((file) => formData.append("files", file));

    // Add extra fields required by backend
    formData.append("listingCaseId", listingCaseId);
    formData.append("type", type);

    return api.post("/api/MediaAsset/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // Delete a specific media asset
  deleteMediaAsset(mediaId) {
    return api.delete(`/api/ListingCase/media/${mediaId}`);
  },

  // Download a media file
  downloadMediaAsset(mediaAssetId) {
    return api.get(`/api/MediaAsset/download/${mediaAssetId}`, {
      responseType: "blob", // ensures binary file is received
    });
  },

  // Set cover image for a listing
  setCoverImage(listingCaseId, imageId) {
    return api.put(`/api/ListingCase/listings/${listingCaseId}/coverImage`, {
      imageId,
    });
  },

  // Select which media to display
  selectDisplayMedia(listingCaseId, mediaIds) {
    return api.put(`/api/ListingCase/listings/${listingCaseId}/SelectDisplayMedia`, {
      mediaIds,
    });
  },

  // Get final display media (public view)
  getFinalMediaSelection(listingCaseId) {
    return api.get(`/api/ListingCase/listings/${listingCaseId}/FinalMediaSelection`);
  },

  // Generate a shareable link for a listing
  generateShareLink(listingCaseId) {
    return api.post(`/api/ListingCase/${listingCaseId}/GenerateShareLink`);
  },
};

export default mediaAssetApi;



