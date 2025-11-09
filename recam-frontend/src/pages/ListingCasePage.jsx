import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import CreatePropertyModal from "../components/CreatePropertyModal";
import { getAllListings, deleteListingById } from "../apis/listingcases.api"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SearchBar from "../components/SearchBar";


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

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");


  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["listings", debouncedSearchTerm],
    queryFn: () => getAllListings(debouncedSearchTerm ? { searchTerm: debouncedSearchTerm } : {}),
    staleTime: 1000 * 60 * 5,
    keepPreviousData: true,
  })

  const listings = data?.data || [];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchTerm])


  function handleEdit(id) {
    console.log("Edit listing with ID:", id)
    navigate(`/edit-listing/${id}`)
  }

  const handleSearchChange = useCallback((val) => {
    setSearchTerm(val);
  }, []);

  async function handleDelete(id) {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;
    try {
      await deleteListingById(id);
      queryClient.invalidateQueries(["listings"]);
    } catch {
      console.error("Failed to delete listing");
    }
  }


  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading listings...
      </div>
    );
  }

  if (isError) {
    return (<div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
      Error:{error.message || "Failed to load listings"}
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
            <SearchBar
              value={searchTerm}
              onChange={handleSearchChange}
            />
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
        onCreated={() => {
          setShowModal(false); queryClient.invalidateQueries(["listings"]);
        }}
      />}

    </>

  )


}