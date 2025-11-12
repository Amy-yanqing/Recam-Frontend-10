import { useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteListingById, getAllListings } from "../apis/listingcases.api";

export function useListings(searchTerm = "") {
    const queryClient = useQueryClient();

    //Get all listings
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["listings", searchTerm],
        queryFn: () =>
            getAllListings(searchTerm ? { searchTerm } : {}),
        staleTime: 1000 * 60 * 5,
        keepPreviousData: true,

    })

    const listings = data?.data || [];

    //Delete the listing and refresh the cache

    const deleteListing = async (id) => {
        if (!window.confirm("Are you sure you want to delete this listing?")) return;
        try {
            await deleteListingById(id);
            queryClient.invalidateQueries(["listings"]);
        } catch {
            console.error("Failed to delete listing");
        }
    }


    return { listings, isLoading, isError, error, deleteListing };

}

