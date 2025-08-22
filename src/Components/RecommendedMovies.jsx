import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getRecommendedMovies } from "../api/api";
import ToastModal from "./ToastModal";
import { Link } from "react-router-dom";
import Loading from "./Loading";

export default function RecommendedMovies() {
  const { user, token } = useAuth();
  const [movies, setMovies] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      async function fetchRecommendedMovies() {
        const response = await getRecommendedMovies(user);
        if (response.status === 200) {
          setMovies(response.message);
        } else {
          setToastMessage(
            response.message || "Failed to fetch recommended movies"
          );
        }
        setLoading(false);
      }
      fetchRecommendedMovies();
    }
  }, [user, token]);

  if (loading) {
    return <Loading />;
  }
  if (!user) return null;

  const filteredMovies = (movies) => movies?.filter((m) => m !== null);

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
      {loading || movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredMovies(movies).map((movie, idx) => (
            <Link key={idx} to={`/movie/${movie.id}`}>
              <div
                key={idx}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={movie.poster || "https://via.placeholder.com/200x300"}
                  alt={movie.title}
                  className="w-full h-60 object-cover"
                />
                <div className="p-3">
                  <h3 className="text-lg font-semibold">{movie.title}</h3>
                  <p className="text-sm text-gray-600">{movie.genre}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">
          No recommendations yet. Like some movies!
        </p>
      )}
      {toastMessage && (
        <ToastModal
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
}
