const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
        <div className="absolute inset-2 rounded-full border-4 border-blue-300 border-t-transparent animate-spin-slow"></div>
      </div>
      <span className="mt-6 text-lg font-semibold text-blue-600 animate-pulse">
        Loading...
      </span>
    </div>
  );
};

export default Loading;