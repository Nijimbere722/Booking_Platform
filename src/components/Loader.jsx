// src/components/Loader.jsx
export default function Loader({ text = 'Loading listings…' }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-gray-400">
      <div className="w-9 h-9 border-4 border-gray-200 border-t-rose-500 rounded-full animate-spin" />
      <p className="text-sm">{text}</p>
    </div>
  );
}