// useFileSelection.js
import { useState } from "react";

export function useFileSelection() {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => setSelectedFiles(Array.from(e.target.files));
  const handleRemoveFile = (index) =>
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setSelectedFiles((prev) => [...prev, ...files]);
  };
  const handleDragOver = (e) => e.preventDefault();

  return {
    selectedFiles,
    handleFileChange,
    handleRemoveFile,
    handleDrop,
    handleDragOver,
  };
}
