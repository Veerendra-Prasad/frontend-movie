// components/RecommendedMovies.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function RecommendedMovies() {
  const { user, token } = useAuth();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (user && token) {
      // Call your recommendation API
      axios
        .post(`${import.meta.env.VITE_APP_URL}/api/v1/recommend`, {
          liked_movies: ["Inception", "Titanic"], // 👈 replace with real user likes
        })
        .then((res) => setMovies(res.data))
        .catch((err) => console.error(err));
    }
  }, [user, token]);

  if (!user) return null; // Hide section if not logged in

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Recommended for You</h2>
      {movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {movies.map((movie, idx) => (
            <div
              key={idx}
              className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition"
            >
              <img
                src={movie.posterUrl || "https://via.placeholder.com/200x300"}
                alt={movie.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-3">
                <h3 className="text-lg font-semibold">{movie.title}</h3>
                <p className="text-sm text-gray-600">{movie.genre}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No recommendations yet. Like some movies!</p>
      )}
    </div>
  );
}
