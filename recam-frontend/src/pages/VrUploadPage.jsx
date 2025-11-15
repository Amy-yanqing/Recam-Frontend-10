import { useParams, Link } from "react-router-dom";

export default function VrUploadPage() {
  const { id } = useParams();

  return (
    <div className="p-8 min-h-screen bg-gray-50 flex flex-col items-center justify-start">
      
      {/* Back Button */}
      <div className="w-full max-w-3xl mb-6">
        <Link
          to={`/edit-listing/${id}`}
          className="text-blue-600 hover:underline text-sm"
        >
          ← Back to Listing
        </Link>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-4">
        VR Tour (Coming Soon)
      </h1>

      {/* Description */}
      <p className="text-gray-600 mb-10 text-center max-w-xl">
        This feature is currently under development.  
        You will be able to upload VR / 360° media for this listing soon.
      </p>

      {/* Placeholder Card */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-10 flex flex-col items-center justify-center border border-gray-200">
        <div className="text-6xl mb-6">🕶️</div>

        <h2 className="text-xl font-medium text-gray-700 mb-3">
          VR Upload Coming Soon
        </h2>

        <p className="text-gray-500 text-center mb-8">
          The VR upload and preview system is being prepared.  
          Stay tuned for immersive 360° media uploads.
        </p>

        <button
          className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg cursor-default"
          disabled
        >
          Upload Disabled
        </button>
      </div>
    </div>
  );
}
