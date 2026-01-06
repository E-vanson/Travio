export default function LoadingState() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 mb-4 fade-in">
      <div className="flex items-center mb-4">
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
        <span className="text-gray-600 font-medium">Thinking...</span>
      </div>

      {/* Skeleton loader for response */}
      <div className="space-y-3">
        <div className="pulse-skeleton h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="pulse-skeleton h-4 bg-gray-200 rounded w-full"></div>
        <div className="pulse-skeleton h-4 bg-gray-200 rounded w-5/6"></div>
        <div className="pulse-skeleton h-4 bg-gray-200 rounded w-2/3"></div>
        <div className="pulse-skeleton h-4 bg-gray-200 rounded w-4/5"></div>
      </div>

      <div className="mt-4 text-xs text-gray-400">
        This may take up to 30 seconds...
      </div>
    </div>
  );
}