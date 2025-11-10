export default function MediaGrid({ mediaList, onDownload, onDelete }) {

    if (!mediaList?.length)

        return (
            <div className="bg-gray-100 text-gray-500 text-center py-8 rounded-md">
                No media uploaded yet
            </div>
        );

    return (<div className="grid grid-cols-3 gap-4">
        {mediaList.map((media) => (
            <div key={media.id} className="relative group">
                <img
                    src={media.mediaUrl}
                    alt="Uploaded"
                    className="w-full h-48 object-cover rounded-md"
                />
                <button
                    onClick={() => onDownload(media)}
                    className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                >Download</button>
                <button
                    onClick={() => onDelete(media.id)}
                    className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    Delete
                </button>
            </div>
        ))
        }
    </div>
    )

}