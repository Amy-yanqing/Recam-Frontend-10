import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import CreatePropertyModal from "../components/CreatePropertyModal";
import { getAllListings, deleteListingById } from "../apis/listingcases.api"


// Convert numeric PropertyType enum to readable text
function getPropertyTypeLabel(type) {
  switch (type) {
    case 1:
      return "For Sale";
    case 2:
      return "For Rent";
    case 3:
      return "Auction";
    default:
      return "Unknown";
  }
}

function getListcasesStatusLabel(status) {
  switch (status) {
    case 1:
      return "Created";
    case 2:
      return "Pending";
    case 3:
      return "Delivered";
    default:
      return "Unknown";

  }
}


export default function ListingCasePage() {

  const [listings, setListings] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();


  const fetchData = async (searchQuery = {}) => {
    console.log("Fetching listing data...");
    setLoading(true);
    setError("");
    try {
      const res = await getAllListings(searchQuery);
      console.log("API response:", res.data);
      setListings(res.data);
    } catch (err) {
      console.error("Error fetching listings", err)
      setError("Faild to fetch listings")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const query = searchTerm ? { searchTerm: searchTerm } : {};
      fetchData(query);

    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm]); //what is the code logical here?


  function handleEdit(id) {
    console.log("Edit listing with ID:", id)
    navigate(`/edit-listing/${id}`)
  }

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    setError("");
    try {
      await deleteListingById(id);
      await fetchData();
    } catch {
      console.error("Failed to delete listing");
      setError("Failed to delete listing");
    }
  }


  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading listings...
      </div>
    );
  }

  if (error) {
    return (<div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
      {error}
    </div>)

  }

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        {/* Welcome Section */}
        <main>
          <h1 className="text-3xl font-semibold text-center text-gray-800 mb-4 py-4 ">
            Hi, Welcom!
          </h1>

          {/* Search + Create Button */}
          <div className="flex justify-center items-center mb-6 gap-4">
            <div className="relative w-full max-w-md">
              <input
                type="text"
                placeholder="Search from listing case"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border border-gray-300 rounded-full py-2 pl-10 pr-4 
                text-gray-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              +Create Property
            </button>

          </div>


          <div className="p-8 bg-white min-h-screen">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-3 text-left text-gray-600">PROPERTY#</th>
                  <th className="p-3 text-left text-gray-600">PROPERTY TYPE</th>
                  <th className="p-3 text-left text-gray-600">PROPERTY ADDRESS</th>
                  <th className="p-3 text-left text-gray-600">CREATED AT</th>
                  <th className="p-3 text-left text-gray-600">STATUS</th>
                  <th className="p-3 text-left text-gray-600">ACTIONS</th>
                </tr>

              </thead>
              <tbody>
                {listings.map((item, index) => (
                  <tr key={item.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 font-medium text-blue-600">
                      #{index + 1}
                    </td>
                    <td className="p-3">{getPropertyTypeLabel(item.propertyType)}</td>
                    <td className="p-3">{item.street},{item.city},{item.state},{item.postcode}</td>
                    <td className="p-3">{new Date(item.createdAt).toLocaleDateString('en-AU', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric'
                    })}</td>
                    <td className="p-3">{getListcasesStatusLabel(item.listcaseStatus)}</td>
                    <td className="relative">
                      <button onClick={() =>
                        setOpenMenuId(openMenuId === item.id ? null : item.id)
                      }
                        className="px-2 text-gray-500 hover:text-gray-800 text-xl"

                      >
                        ...
                      </button>
                      {openMenuId === item.id && (
                        <div className="absolute right-30 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg text-sm z-10 w-28 ">
                          <button onClick={() => handleEdit(item.id)} className="block w-full px-4 py-2 text-left hover:bg-gray-100 ">Edit</button>
                          <button onClick={() => handleDelete(item.id)} className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-red-500">Delete</button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>

      </div>
      {showModal && <CreatePropertyModal
        onClose={() => setShowModal(false)}
        onCreated={fetchData}
      />}

    </>

  )


}