import { useEffect, useState } from "react";
import { X } from "lucide-react"; // optional icon lib (lucide-react)

export default function ToastModal({ message, duration = 5000, onClose }) {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!message) return;

    // Progress bar countdown
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prev - 100 / (duration / 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [message, duration, onClose]);

  if (!message) return null;

  return (
    <div className="fixed top-4 right-4 w-72 bg-white shadow-lg rounded-xl border border-gray-200 overflow-hidden animate-slide-in">
      <div className="flex items-start justify-between p-3">
        <p className="text-sm text-gray-800">{message}</p>
        <button
          onClick={onClose}
          className="ml-2 text-gray-500 hover:text-gray-700"
        >
          <X size={16} />
        </button>
      </div>
      {/* Progress Bar */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-1 bg-blue-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
