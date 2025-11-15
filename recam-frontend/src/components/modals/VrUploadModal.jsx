export default function VrUploadModal({ isOpen, onClose }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            {/* Modal Container */}
            <div className="bg-white border border-gray-200 p-6 rounded-md shadow-lg max-w-md w-full text-center">

                {/* Title */}
                <h2 className="text-2xl font-bold mb-4 text-gray-800">VR Upload (Coming Soon)</h2>

                {/* Placeholder Content */}
                <div className="p-6 border border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <p className="text-gray-700 text-lg font-medium mb-2">
                        VR Media Upload is under development.
                    </p>
                    <p className="text-gray-500 text-sm">
                        This feature will allow uploading VR tours, 360° images and more.
                    </p>
                </div>

                {/* Button */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
