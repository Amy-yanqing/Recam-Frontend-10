import { useParams } from "react-router-dom";
import { useMedia } from "../hooks/useMediaAssets";
import toast from "react-hot-toast";
import mediaAssetApi from "../apis/media-assets.api";
import { useState, useEffect, useCallback } from "react";
import MediaSection from "../components/media/MediaSection";
import { MEDIA_TYPE } from "../constants/mediaTypes";

export default function FloorPlanUploadPage() {
  const { id } = useParams();
  const { uploadMedia, deleteMedia, downloadMedia } = useMedia();

  const [floorPlans, setFloorPlans] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchFloorPlans = useCallback(async () => {
    try {
      const res = await mediaAssetApi.getMediaAssetsByType(
        id,
        MEDIA_TYPE.FLOORPLAN
      );
      setFloorPlans(res.data || []);
    } catch (err) {
      console.error("Error fetching Floor plans:", err);
    }
  }, [id]);

  useEffect(() => {
    fetchFloorPlans();
  }, [fetchFloorPlans]);

  const handleUpload = async () => {
    if (!selectedFiles.length) {
      toast.error("Please select at least one file");
      return;
    }
    setUploading(true);
    await uploadMedia(id, selectedFiles, MEDIA_TYPE.FLOORPLAN);
    setUploading(false);
    setSelectedFiles([]);
    setIsModalOpen(false);
    await fetchFloorPlans();
  };

  return (
    <div className="p-8 min-h-screen bg-gray-50">
      <MediaSection
        title="Floor Plan"
        backTo={`/edit-listing/${id}`}
        mediaList={floorPlans}
        onDownload={downloadMedia}
        onDelete={async (floorPlanId) => {
          await deleteMedia(floorPlanId);
          await fetchFloorPlans();
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
  );
}
