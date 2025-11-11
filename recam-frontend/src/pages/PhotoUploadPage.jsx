import { useParams } from "react-router-dom"
import { useMedia } from "../hooks/useMediaAssets"
import toast from "react-hot-toast";
import { getListingById } from "../apis/listingcases.api";
import { useState, useEffect, useCallback } from "react";
import MediaSection from "../components/media/MediaSection";


export default function PhotoUploadPage() {
  const { id } = useParams();
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



  const handleUpload = async () => {
    if (!selectedFiles.length) {
      toast.error("Please select at least one file");
      return;
    }
    setUploading(true);
    await uploadMedia(id, selectedFiles, 1);//这个 file type 要通过参数传进去吧
    setUploading(false);
    setSelectedFiles([]);
    setIsModalOpen(false);
    await fetchPhotos();
  };

  return (

    <div className="p-8 min-h-screen bg-gray-50">
      <MediaSection

        title="Photography"
        backTo={`/edit-listing/${id}`}
        mediaList={photos}

        onDownload={downloadMedia}
        onDelete={async (photoId) => {
          await deleteMedia(photoId);
          await fetchPhotos();
        }}

        onUpload={handleUpload}
        selectedFiles={selectedFiles}
        onFileChange={(e) => setSelectedFiles(Array.from(e.target.files))}
        onRemoveFile={(index) =>
          setSelectedFiles((prev) => prev.filter((_, i) => i !== index))
        }
        uploading={uploading}

        onDrop={(e) => {
          e.preventDefault();
          const files = Array.from(e.dataTransfer.files);
          setSelectedFiles((prev) => [...prev, ...files]);
        }}
        onDragOver={(e) => e.preventDefault()}

        isModalOpen={isModalOpen}
        onOpenModal={() => setIsModalOpen(true)}
        onCloseModal={() => setIsModalOpen(false)}
      />
    </div>
  )

}