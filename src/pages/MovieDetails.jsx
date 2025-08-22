import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";
import CommentCard from "../components/CommentCard";
import ToastModal from "../components/ToastModal";
import { useAuth } from "../context/AuthContext";
import { getMovieById, createReview, LikedMovies } from "../api/api";
import Loading from "../components/Loading";

export default function MovieDetails() {
  const { user, setLikedMovies } = useAuth();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(user?.likedMovies?.includes(id) || false);
  const [showFullPlot, setShowFullPlot] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const movieData = await getMovieById(id);
      if (movieData.message) {
        setMovie(movieData.message);
        setComments(movieData.message.reviews || []);
      } else {
        setToastMessage("Movie not found");
        setComments([]);
        setMovie(null);
      }
      setLoading(false);
    };
    fetchMovie();
  }, [id]);

  const sendComment = async (comment) => {
    if (!user) {
      setToastMessage("you need to be logged in to comment");
      return;
    }
    const response = await createReview(id, user, comment);
    if (response.status === 200) {
      setComments([...comments, response.message]);
      setToastMessage("Comment added successfully!");
      return;
    }
    setToastMessage("Comment not added, please try again");
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "") {
      sendComment(newComment);
      setNewComment("");
    } else {
      setToastMessage("Comment cannot be empty!");
      return;
    }
  };

  const handleLiked = () => {
    if (!user) {
      setToastMessage("You need to be logged in to like a movie.");
      return;
    } else {
      setLiked(!liked);
      LikedMovies(id, user, setLikedMovies);
      // send an api request to update the liked movies in the backend
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {movie ? (
        <>
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={movie.poster}
              alt={movie.title}
              className="rounded-xl shadow-lg w-full md:w-1/3 h-80 object-cover"
            />
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
              <div className="flex flex-wrap gap-2 mb-3">
                {movie.genres &&
                  movie.genres.map((genre) => (
                    <span
                      key={genre}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium"
                    >
                      {genre}
                    </span>
                  ))}
              </div>
              {/* IMDb Rating Element */}
              <div className="flex items-center mb-2 gap-3">
                <span className="text-yellow-500 font-bold text-lg">IMDb</span>
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-lg font-semibold">
                  {movie.imdbRating ? movie.imdbRating : "N/A"}
                </span>
                <span className="text-gray-500 text-sm">({movie.rated})</span>
              </div>
              {/* Other Ratings */}
              <div className="flex gap-2 mb-2">
                {movie.rating &&
                  movie.rating.map((r, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs"
                    >
                      {r.Source}: {r.Value}
                    </span>
                  ))}
              </div>
              {/* Plot with Read More */}
              <p className="text-gray-700 mb-4">
                {showFullPlot || !movie.plot
                  ? movie.plot
                  : `${movie.plot.slice(0, 200)}... `}
                {movie.plot && movie.plot.length > 200 && (
                  <button
                    className="text-blue-600 underline ml-2"
                    onClick={() => setShowFullPlot(!showFullPlot)}
                  >
                    {showFullPlot ? "Show less" : "Read more"}
                  </button>
                )}
              </p>
              <div className="mb-2 text-sm text-gray-600">
                <span className="font-semibold">Director:</span>{" "}
                {movie.director}
              </div>
              <div className="mb-2 text-sm text-gray-600">
                <span className="font-semibold">Writer:</span> {movie.writer}
              </div>
              <div className="mb-2 text-sm text-gray-600">
                <span className="font-semibold">Actors:</span> {movie.actors}
              </div>
              <div className="mb-2 text-sm text-gray-600">
                <span className="font-semibold">Runtime:</span> {movie.runtime}
              </div>
              <div className="mb-2 text-sm text-gray-600">
                <span className="font-semibold">Language:</span>{" "}
                {movie.language}
              </div>
              <div className="mb-2 text-sm text-gray-600">
                <span className="font-semibold">Box Office:</span>{" "}
                {movie.boxOffice}
              </div>
              <div className="mb-4 text-sm text-gray-600">
                <span className="font-semibold">Release Date:</span>{" "}
                {movie.releaseDate}
              </div>
              <button
                onClick={() => handleLiked()}
                className={`px-5 py-2 rounded-xl text-white font-semibold transition transform hover:scale-105 ${
                  liked
                    ? "bg-gradient-to-r from-pink-500 to-red-500"
                    : "bg-gradient-to-r from-blue-500 to-purple-600"
                }`}
              >
                {liked ? "❤️ Liked" : "👍 Like"}
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-10">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>
            {comments.length > 0 ? (
              comments.map((review, index) => (
                <CommentCard key={index} review={review} />
              ))
            ) : (
              <p className="text-gray-500">
                No comments yet. Be the first to comment!
              </p>
            )}

            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Add a comment..."
                className="flex-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button handleAddComment={handleAddComment} />
            </div>
          </div>
          {toastMessage && (
            <ToastModal
              message={toastMessage}
              onClose={() => setToastMessage("")}
            />
          )}
        </>
      ) : (
        <div className="text-center text-gray-500">Movie not found.</div>
      )}
    </div>
  );
}
