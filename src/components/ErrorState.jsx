// src/components/ErrorState.jsx
export default function ErrorState({ message = 'Something went wrong.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center text-gray-500">
      <span className="text-4xl">⚠️</span>
      <p className="text-sm max-w-sm">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-rose-500 text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-rose-600 transition-colors cursor-pointer"
        >
          Try Again
        </button>
      )}
    </div>
  );
}