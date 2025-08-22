import React from "react";
import RecommendedMovies from "../components/RecommendedMovies";

const RecommendationPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-800 text-white py-4">
        <h1 className="text-center text-3xl font-bold">Movie Recommendations</h1>
        <p className="text-center text-gray-300 mt-2">
          Discover movies tailored just for you!
        </p>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8">
        <RecommendedMovies />
      </main>
    </div>
  );
};

export default RecommendationPage;