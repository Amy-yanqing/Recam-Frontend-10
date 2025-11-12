export default function LoadingOrError({ isLoading, isError, error }) {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Loading listings...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-600 text-lg">
        Error: {error?.message || "Failed to load listings"}
      </div>
    );
  }

  return null;
}
