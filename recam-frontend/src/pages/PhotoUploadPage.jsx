import { useNavigate, useParams } from "react-router-dom"
import { useMedia } from "../hooks/useMediaAssets"
import toast from "react-hot-toast";
import { getListingById } from "../apis/listingcases.api";
import { useState, useEffect, useCallback } from "react";

export default function PhotoUploadPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { uploadMedia, deleteMedia, downloadMedia } = useMedia();

  const [photos, setPhotos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);


  const fetchPhotos = useCallback(async () => {
    try {
      const res = await getListingById(id);
      setPhotos(res.data.mediaAssets || []);
    } catch (err) {
      console.error("Error fetching photos:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);


  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) {
      toast.error("Please select at least one file");
      return;
    }
    setUploading(true);
    await uploadMedia(id, selectedFiles, 1);
    setUploading(false);
    setSelectedFiles([]);
    setIsModalOpen(false);
    await fetchPhotos();
  };

  const handleDelete = async (photoId) => {
    await deleteMedia(photoId);
    await fetchPhotos();
  }


  return (

    <div className="p-8 min-h-screen bg-gray-50">
      <div className="bg-blue-500 px-4 py-4 text-center text-xl mb-8">here will add nav section soon</div>
      {/* Main content area */}
      <main className="max-w-5xl mx-auto bg-white p-6 rounded-md shadow">

        {/* Header*/}
        <div className="flex justify-between items-center mb-8">

          <div className="text-2xl font-bold text-gray-800"> Photography </div>
          <button
            onClick={() => navigate(`/edit-listing/${id}`)}
            className="text-blue-600 font-semibold hover:underline">
            Back
          </button>
        </div>

        {/* Upload Button */}
        <div className="text-center mb-6">
          <button onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >Upload Photos
          </button>
        </div>

        {/*Content area*/}
        {photos.length === 0 ? (
          <div className="bg-gray-100 text-gray-500 text-center py-8 rounded-md">
            No photos uploaded yet
          </div>
        ) : (<div className="grid grid-cols-3 gap-4">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group">
              <img
                src={photo.mediaUrl}
                alt="Uploaded"
                className="w-full h-48 object-cover rounded-md"
              />
              <button
                onClick={()=>downloadMedia(photo)}
                className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
              >Download</button>
              <button
                onClick={() => handleDelete(photo.id)}
                className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
              >
                Delete
              </button>
            </div>
          ))}

        </div>

        )
        }
      </main>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          {/* Modal Container */}
          <div className="bg-white border border-gray-200 p-6 rounded-md shadow-lg max-w-md w-full">
            {/* Modal Title */}
            <h2 className="text-xl font-bold mb-4">Upload Photos</h2>

            {/* Files Selecter */}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="mb-4 w-full"
            />

            {/* Show Selected Files */}
            {selectedFiles.length > 0 && (
              <p className="text-sm text-gray-600 mb-4">
                {selectedFiles.length} file(s) selected
              </p>
            )}

            {/* Button Group */}
            <div className="flex gap-2 justify-end">
              {/* Cancel Button */}
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedFiles([]);
                }}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                disabled={uploading}
              >
                Cancel
              </button>

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )

}