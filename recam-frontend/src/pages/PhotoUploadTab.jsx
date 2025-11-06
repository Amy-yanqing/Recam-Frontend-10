import { useState } from "react";
import { useMedia } from "../hooks/useMediaAssets";
import { Upload, Trash2, Download, X } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function PhotoUploadTab({ listingCaseId = 4004, photos = [] }) {
  const { uploadMedia, deleteMedia, downloadMedia } = useMedia();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    if (!selectedFiles.length) {
      toast.error("Please select at least one file");
      return;
    }
    await uploadMedia(listingCaseId, selectedFiles, 1);
    setSelectedFiles([]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      {/* 上传按钮 */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center"
      >
        <Upload className="w-4 h-4 mr-2" />
        Upload Photos
      </button>

      {/* 图片展示 */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative group">
            <img
              src={photo.mediaUrl}
              alt="photo"
              className="w-full h-40 object-cover rounded-lg"
            />
            <button
              onClick={() => downloadMedia(photo)}
              className="absolute top-1 left-1 bg-blue-500 text-white p-1 rounded-full"
            >
              <Download size={14} />
            </button>
            <button
              onClick={() => deleteMedia(photo.id)}
              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* 上传模态框 */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-96">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Upload New Photos</h3>
              <button onClick={() => setIsModalOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <input type="file" multiple onChange={handleFileChange} />
            <div className="grid grid-cols-3 gap-2 my-3">
              {selectedFiles.map((f, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(f)}
                  alt={f.name}
                  className="h-20 object-cover rounded"
                />
              ))}
            </div>
            <button
              onClick={handleUpload}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
            >
              Upload
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
