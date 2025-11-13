import { useParams } from "react-router-dom"
import { useMedia } from "../hooks/useMediaAssets"
import toast from "react-hot-toast";
import mediaAssetApi from "../apis/media-assets.api";
import { useState, useEffect, useCallback } from "react";
import MediaSection from "../components/media/MediaSection";
import { MEDIA_TYPE } from "../constants/mediaTypes";


export default function VideoUploadPage() {
  const { id } = useParams();
  const { uploadMedia, deleteMedia, downloadMedia } = useMedia();

  const [videos, setVideos] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchVideos = useCallback(async () => {
    try {
      const res = await mediaAssetApi.getMediaAssetsByType(id,MEDIA_TYPE.VIDEO);
      setVideos(res.data || []);
    } catch (err) {
      console.error("Error fetching Videos:", err);
    }
  }, [id]);

  useEffect(() => {
   fetchVideos();
  }, [fetchVideos]);


  const handleUpload = async () => {
    if (!selectedFiles.length) {
      toast.error("Please select at least one file");
      return;
    }
    setUploading(true);
    await uploadMedia(id, selectedFiles, MEDIA_TYPE.VIDEO);
    setUploading(false);
    setSelectedFiles([]);
    setIsModalOpen(false);
    await fetchVideos();
  };

  return (
  
    <div className="p-8 min-h-screen bg-gray-50">
      <MediaSection

        title="Videography"
        backTo={`/edit-listing/${id}`}
        mediaList={videos}

        onDownload={downloadMedia}
        onDelete={async (videoId) => {
          await deleteMedia(videoId);
          await fetchVideos();
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