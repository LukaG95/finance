export default function Loading() {
  return (
    <div className="p-400 flex items-center justify-center">
      <div className="animate-spin h-6 w-6 border-4 border-grey-300 border-t-grey-900 rounded-full" />
      <span className="ml-2 text-grey-700 text-sm">Loading transactions...</span>
    </div>
  );
}
