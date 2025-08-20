import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="relative w-full h-72 bg-gray-200 flex items-center justify-center">
        {movie.backdrops && movie.backdrops[0] && (
          <div
            className="absolute inset-0 w-full h-full rounded-t-lg"
            style={{
              backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0)), url(${movie.backdrops[0]})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
            }}
          />
        )}
        <img
          src={movie.poster}
          alt={movie.title}
          className="relative z-10 h-full object-contain mx-auto"
        />
      </div>
      {/* <img
        src={movie.poster}
        alt={movie.title}
        className="w-full h-72 object-contain object-center"
        style={{ backgroundImage: `url(${movie.backdrops[0]})`}}
      /> */}
      <div className="p-4">
        <h2 className="text-xl font-semibold">{movie.title}</h2>

        <button className="bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-6 rounded-full shadow-lg transition duration-200 mt-4">
          <Link to={`/movies/${movie.imdbId}`} className="block">
            View Details
          </Link>
        </button>
      </div>
    </div>
  );
}
