import React from "react";
import {useNavigate, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import api from "../config/api.config";

const AddReview = () => {
  const movie = useLocation().state?.movie;
  const navigate = useNavigate();
  const [body, setBody] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await api.post("/api/v1/reviews",{reviewBody:body,imdbId:movie.imdbId});
    } catch(error){
      console.log(error)
    } finally{
      navigate(`/movies/${movie.imdbId}`);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl mb-4">Add Review for {movie?.title}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Your review"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default AddReview;
