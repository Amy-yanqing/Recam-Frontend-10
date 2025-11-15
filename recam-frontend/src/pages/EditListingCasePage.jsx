import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import ModuleCard from "../components/ui/ModuleCard";
import { getListingById, updateListing } from "../apis/listingcases.api";
import { toast } from 'react-hot-toast';
import Breadcrumb from "../components/ui/BreadcrumbPath";
import UpdatePropertyModal from "../components/modals/UpdatePropertyModal";



export default function EditListingCasePage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const fetchListing = useCallback(async () => {
    try {
      const res = await getListingById(id);
      setListing({ ...res.data });

    } catch (err) {
      console.log("Error fetching listing:", err)
    }
  }, [id]);


  //Fetch listing details by ID
  useEffect(() => {
    setLoading(true);
    fetchListing().finally(() => { setLoading(false) });
  }, [fetchListing])


  const handleDeliver = async () => {
    try {
      await updateListing(id, { ...listing, listcaseStatus: 3 });
      toast.success("Delivered to agent successfully!");
    } catch (err) {
      console.error("Error delivering listing:", err);
      toast.error("Failed to deliver listing.");
    }
  };


  if (loading) return <div className="text-center mt-10">Loading...</div>
  if (!listing) return <div className="text-center mt-10 text-gray-600">No listing data found.</div>;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Section */}
      <main className="flex flex-col items-center px-10 py-10">

        <h1 className="text-3xl font-semibold mb-10 text-gray-800">Hi, Welcome!</h1>
        {/*Breadcrumb path*/}
        <Breadcrumb listing={listing} />
        <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 mb-10">
          <ModuleCard title="Photography" icon="📸" to={`/photo-upload/${listing.id}`} />
          <ModuleCard title="Floor Plan" icon="📐" to={`/floorPlan-upload/${listing.id}`} />
          <ModuleCard title="Videography" icon="🎥" to={`/video-upload/${listing.id}`} />
          <ModuleCard title="VR Tour" icon="🕶️" to={`/photo-upload/${listing.id}`} />
          <ModuleCard title="Agents" icon="👤" to={`/photo-upload/${listing.id}`} />
          <ModuleCard title="Property Details" icon="🏠" onClick={() => setShowUpdateModal(true)} />
        </section>

        <button onClick={handleDeliver} className="bg-blue-500 text-gray-100 px-8 py-4 
            rounded-xl font-semibold hover:bg-blue-600 transition shadow">Delivery to agent
        </button>

      </main>

      {showUpdateModal && (<UpdatePropertyModal onClose={() => setShowUpdateModal(false)}
        listingCaseId={listing.id}/>)
      }
    </div>
  )

}

