import ToastModal from "../components/ToastModal";
import api from "../config/api.config";
import axios from "axios";

const Login = async (userData, login) => {
  try {
    const response = await axios.post(`${api.getUri()}/auth/login`, userData);
    if (response.status === 200) {
      const { token, userData } = response.data;
      login(userData, token);
      return "logged in";
    } else {
      return response.data.message;
    }
  } catch (error) {
    return error.message;
  }
};

const Logout = async (logout) => {
  logout();
};

const getMovies = async (pageNum = 0) => {
  try {
    const response = await axios.get(
      `${api.getUri()}/api/v1/movies?page=${pageNum}&size=10`
    );
    if (response.status !== 200) {
      return "Failed to fetch movies";
    }
    return response.data;
  } catch (error) {
    return error.message;
  }
};

const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${api.getUri()}/api/v1/movies/${id}`);
    if (response.status !== 200) {
      return "Failed to fetch movie details";
    }
    return response.data;
  } catch (error) {
    return  error.message;
  }
};

const createReview = async (movieId, user, comment) => {
  try {
    const response = await axios.post(
      `${api.getUri()}/api/v1/reviews/${movieId}/${user.id}/create`,
      { comment }
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return  response.data.message;
    }
  } catch (error) {
    return error.message;
  }
};

export { Login, Logout, getMovies, getMovieById, createReview };
