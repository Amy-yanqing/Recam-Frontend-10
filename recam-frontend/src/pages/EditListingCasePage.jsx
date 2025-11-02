import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getListingById, updateListing } from "../apis/listingcases.api";

export default function EditListingCasePage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch listing details by ID
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await getListingById(id);
        setListing(res.data);
      } catch (err) {
        console.error("Error fetching listing:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListing();
  }, [id]);

  // ✅ Example logic for "Deliver to Agent" button
  const handleDeliver = async () => {
    try {
      await updateListing(id, { ...listing, listcaseStatus: 3 }); // 3 = Delivered
      alert("✅ Delivered to agent successfully!");
    } catch (err) {
      console.error("Error delivering listing:", err);
      alert("❌ Failed to deliver listing.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!listing) return <div className="text-center mt-10 text-gray-600">No listing data found.</div>;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white flex justify-between items-center px-10 py-3 shadow">
        <div className="text-xl font-bold tracking-wide">recam</div>
        <nav className="flex space-x-8 text-sm">
          <a href="/listing-cases" className="hover:underline">Listing Cases</a>
          <a href="/all-agents" className="hover:underline">Agents</a>
        </nav>
      </header>

      {/* Main Section */}
      <main className="flex flex-col items-center px-10 py-10">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800">Hi, Welcome!</h1>

        {/* Breadcrumb path */}
        <p className="text-gray-700 mb-8">
          Property ›{" "}
          <span className="text-blue-600 font-medium">
            {listing.street}, {listing.city}, {listing.state}, {listing.postcode}
          </span>
        </p>

        {/* Module grid section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-10">
          <ModuleCard title="Photography" icon="📸" />
          <ModuleCard title="Floor Plan" icon="📐" />
          <ModuleCard title="Videography" icon="🎥" />
          <ModuleCard title="VR Tour" icon="🕶️" />
          <ModuleCard title="Agents" icon="👤" />
          <ModuleCard title="Property Details" icon="🏠" />
        </div>

        {/* Deliver button */}
        <button
          onClick={handleDeliver}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-medium"
        >
          Deliver to Agent
        </button>
      </main>
    </div>
  );
}

// Reusable module card component
function ModuleCard({ title, icon }) {
  return (
    <div
      className="flex flex-col justify-center items-center border-2 border-dashed rounded-xl p-6 
                 hover:bg-gray-50 transition shadow-sm cursor-pointer w-32 h-28"
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="font-medium text-gray-700 text-center text-sm">{title}</div>
    </div>
  );
}
