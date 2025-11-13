export default function UploadModal({
    isOpen, title = "Upload Photos",
    accept = "image/*", onDrop, onDragOver,
    onFileChange, selectedFiles = [],
    onRemoveFile, onClose, uploading, onUpload}) {

    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            {/* Modal Container */}
            <div className="bg-white border border-gray-200 p-6 rounded-md shadow-lg max-w-md w-full">
                {/* Modal Title */}
                <h2 className="text-xl font-bold mb-4">{title}</h2>

                {/* Upload area */}
                <div
                    className="border-2 border-dashed border-gray-300 rounded p-4 text-center"
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                >
                    <p className="text-gray-900 mb-4">Drop your items here to upload</p>
                    <label className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition">
                        Choose Files
                        <input
                            type="file"
                            multiple
                            accept={accept}
                            onChange={onFileChange}
                            className="hidden"
                        />
                    </label>
                </div>

                {/* Preview Selected images */}
                {selectedFiles.length > 0 && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-700 mb-4">
                            {selectedFiles.length} image(s) selected
                        </p>
                        <div className="grid grid-cols-4 gap-4">
                            {selectedFiles.map((file, index) => {
                                const previewUrl = URL.createObjectURL(file);
                                return (
                                    <div key={index} className="relative group">
                                        <img
                                            src={previewUrl}
                                            alt={file.name}
                                            className="w-full h-32 object-cover rounded-md border"
                                        />
                                        <button
                                            onClick={() => onRemoveFile(index)}
                                            className="absolute top-1 right-1 bg-red-600 text-white text-xs 
                      px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition"
                                        >
                                            X
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Button Group */}
                <div className="flex gap-2 justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                        disabled={uploading}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={onUpload}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
                        disabled={uploading}
                    >
                        {uploading ? "Uploading..." : "Upload"}
                    </button>
                </div>
            </div>
        </div>
    );

}




