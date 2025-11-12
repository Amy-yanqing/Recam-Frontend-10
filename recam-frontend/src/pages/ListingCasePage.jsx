import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import CreatePropertyModal from "../components/modals/CreatePropertyModal";
import { getAllListings, deleteListingById } from "../apis/listingcases.api"
import { useQuery, useQueryClient } from "@tanstack/react-query";
import SearchBar from "../components/inputs/SearchBar";
import ListingCaseTable from "../components/table/ListingCaseTable";


export default function ListingCasePage() {

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
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
          <ListingCaseTable listings={listings} onEdit={handleEdit} onDelete={handleDelete} />
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