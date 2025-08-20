import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import RecommendedMovies from "../components/RecommendedMovies";
import { getMovies } from "../api/api";
import ToastModal from "../components/ToastModal";

function Home() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      const result = await getMovies(page);
      if (result) {
        const { content, totalPages } = result.message;
        setMovies(content);
        setTotalPages(totalPages);
      } else {
        setMovies([]);
        setTotalPages(1);
        setToastMessage("Failed to fetch movies");
      }
    }
    fetchMovies();
  }, [page]);

  const filteredMovies = (movies) =>
    movies.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()));

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Recommendation Section */}

      <RecommendedMovies />

      {/* Discover Movies */}

      <h1 className="text-3xl font-bold mb-6">Discover Movies</h1>

      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="w-full p-3 rounded-xl shadow-sm border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {movies && movies.length > 0 ? (
          filteredMovies(movies).map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-2 group"
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="rounded-lg w-full h-60 object-cover object-center"
              />
              <h2 className="mt-3 text-lg font-semibold group-hover:text-blue-600 transition">
                {movie.title}
              </h2>
            </Link>
          ))
        ) : (
          <Loading />
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-8 space-x-4">
        <button
          onClick={handlePrev}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page >= totalPages - 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {/* Toast Message */}
      {toastMessage && (
        <ToastModal
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
}

export default Home;
