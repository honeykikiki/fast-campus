export default function Loader({ className = '' }) {
  return (
    <div className={`flex gap-4 justify-center mt-10 ${className}`}>
      <div className="animate-ping w-2 h-2 rounded-full bg-gray-500" />
      <div className="animate-ping w-2 h-2 rounded-full bg-gray-500" />
      <div className="animate-ping w-2 h-2 rounded-full bg-gray-500" />
    </div>
  );
}
