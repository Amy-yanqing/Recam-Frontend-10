export default function Breadcrumb({listing}) {

    return (
        <div className="max-w-6xl w-full">
            <p className="text-gray-700 text-md mb-2">
                Property &gt;{" "}
                <span>
                    {listing.street}, {listing.city}, {listing.state}, {listing.postcode}
                </span>
            </p>
        </div>)
}


