import React from "react";

// Utility to format date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Single Comment Card
function CommentCard({ review }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-4 mb-4 border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{review.username}</h3>
        <span className="text-sm text-gray-500">{formatDate(review.created)}</span>
      </div>
      <p className="text-gray-700">{review.body}</p>
    </div>
  );
}

export default CommentCard;