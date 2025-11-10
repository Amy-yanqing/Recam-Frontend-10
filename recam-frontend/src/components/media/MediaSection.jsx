// Combines reusable upload section: Title + Back Button + Upload Button + Media Grid + Modal

import SectionTitle from "../ui/SectionTitle";
import BackButton from "../ui/BackButton";
import UploadButton from "../ui/UploadButton";
import MediaGrid from "../ui/MediaGrid";
import UploadModal from "../modals/UploadModal";
import { useState } from "react";

export default function MediaSection({
  title,               // Page title, e.g. "Photography"
  backTo,              // Navigation path for the Back button
  mediaList,           // Array of media files
  onDownload,          // Callback for file download
  onDelete,            // Callback for file deletion
  onUpload,            // Callback for upload action
  selectedFiles,       // Currently selected files for upload
  onFileChange,        // Handler for file input change
  onRemoveFile,        // Handler for removing a file from selection
  uploading,           // Uploading state (boolean)
  onDrop,              // Drag-and-drop handler
  onDragOver,          // Drag-over handler
  accept = "image/*",  // Accepted file types
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="max-w-5xl mx-auto bg-white p-6 rounded-md shadow">
      {/* ===== Header Section ===== */}
      <div className="flex justify-between items-center mb-8">
        <SectionTitle title={title} />
        <BackButton to={backTo} />
      </div>

      {/* ===== Upload Button ===== */}
      <div className="text-center mb-6">
        <UploadButton
          label={`Upload ${title}`}
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* ===== Media Display Grid ===== */}
      <MediaGrid
        mediaList={mediaList}
        onDownload={onDownload}
        onDelete={onDelete}
      />

      {/* ===== Upload Modal ===== */}
      <UploadModal
        isOpen={isModalOpen}
        title={`Upload ${title}`}
        accept={accept}
        selectedFiles={selectedFiles || []}
        onFileChange={onFileChange}
        onRemoveFile={onRemoveFile}
        onUpload={onUpload}
        uploading={uploading}
        onClose={() => setIsModalOpen(false)}
        onDrop={onDrop}
        onDragOver={onDragOver}
      />
    </main>
  );
}
