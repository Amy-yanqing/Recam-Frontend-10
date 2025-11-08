import mediaAssetApi from "../apis/media-assets.api";
import toast from "react-hot-toast";

/**
 * useMediaAssets Hook
 * 封装媒体文件的上传、删除、下载逻辑
 */
export function useMedia() {
  // 上传媒体文件（照片、视频、平面图等）
  const uploadMedia = async (listingCaseId, files, type) => {
    try {
      await mediaAssetApi.uploadMediaAssets(listingCaseId, files, type);
      toast.success("Upload successful!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Upload failed!");
    }
  };

  // 删除媒体文件
  const deleteMedia = async (id) => {
    try {
      await mediaAssetApi.deleteMediaAsset(id);
      toast.success("Media deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete media!");
    }
  };

  // 下载媒体文件
  const downloadMedia = async (media) => {
    try {
      const res = await mediaAssetApi.downloadMediaAsset(media.id);
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.download =`photo_${media.id}.jpg`;
      link.click();
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download failed!");
    }
  };

  return { uploadMedia, deleteMedia, downloadMedia };
}
