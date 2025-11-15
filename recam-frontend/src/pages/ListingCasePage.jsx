import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom"
import CreatePropertyModal from "../components/modals/CreatePropertyModal";

import SearchBar from "../components/inputs/SearchBar";
import ListingCaseTable from "../components/table/ListingCaseTable";
import { useListings } from "../hooks/useListings";
import useDebouncedValue from "../hooks/useDebouncedValue"
import LoadingOrError from "../components/common/LoadingOrError";


export default function ListingCasePage() {

  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebouncedValue(searchTerm, 400);
  const { listings, isLoading, isError, error, deleteListing } = useListings(debouncedSearchTerm)
  const [showCreateModal, setShowCreateModal] = useState(false);
  const navigate = useNavigate();


  function handleEdit(id) {
    console.log("Edit listing with ID:", id)
    navigate(`/edit-listing/${id}`)
  }

  const handleSearchChange = useCallback((val) => {
    setSearchTerm(val);
  }, []);


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
              onClick={() => setShowCreateModal(true)}
              className="ml-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              +Create Property
            </button>
            {/* Loading or Error */}
            <LoadingOrError isLoading={isLoading} isError={isError} error={error} />

          </div>
          {/* Only show table if data is ready */}
          {!isLoading && !isError && (
            <ListingCaseTable
              listings={listings}
              onEdit={handleEdit}
              onDelete={deleteListing}
            />
          )}
        </main>

      </div>
      {showCreateModal && <CreatePropertyModal
        onClose={() => setShowCreateModal(false)}
      />}

    </>

  )


}