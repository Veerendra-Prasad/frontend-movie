import api from "../config/api.config";
import axios from "axios";

const LoginUser = async (userData, login) => {
  try {
    const response = await axios.post(`${api.getUri()}/auth/login`, userData);
    console.log("Response :" + response);
    if (response.status === 200) {
      const { token, username, email, id, likedMoviesIds } = response.data;
      login(username, email, id,likedMoviesIds, token);
      return { status: 200, message: "logged in" };
    } else {
      return { status: 400, message: response.data.message };
    }
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

const Logout = async (logout) => {
  logout();
  return { status: 200, message: "Logged out successfully" };
};

const getMovies = async (pageNum = 0) => {
  try {
    const response = await axios.get(
      `${api.getUri()}/api/v1/movies?page=${pageNum}&size=10`
    );
    if (response.status !== 200) {
      return { status: 400, message: "Failed to fetch movies" };
    }
    return { status: 200, message: response.data };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${api.getUri()}/api/v1/movies/${id}`);
    if (response.status !== 200) {
      return { status: 400, message: "Failed to fetch movie details" };
    }
    return { status: 200, message: response.data };
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

const createReview = async (movieId, user, comment) => {
  try {
    const response = await axios.post(
      `${api.getUri()}/api/v1/reviews/${movieId}/${user.id}/create`,
      { comment }
    );
    if (response.status === 200) {
      return { status: 200, message: response.data };
    } else {
      return { status: 400, message: response.data.message };
    }
  } catch (error) {
    return { status: 500, message: error.message };
  }
};

export { LoginUser, Logout, getMovies, getMovieById, createReview };
