import API from "../config/api.config";
import axios from "axios";

const LoginUser = async (userData, login) => {
  try {
    const response = await axios.post(`${API.getUri()}/auth/login`, userData);
    if (response.status === 200) {
      const { token, username, email, id, likedMoviesIds } = response.data;
      login(username, email, id, likedMoviesIds, token);
      return { status: 200, message: "logged in" };
    } else {
      return { status: 400, message: response.data.message };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: error.response.data };
  }
};

const Logout = async (logout) => {
  logout();
  return { status: 200, message: "Logged out successfully" };
};

const getMovies = async (pageNum = 0) => {
  try {
    const response = await axios.get(
      `${API.getUri()}/api/v1/movies?page=${pageNum}&size=10`
    );
    if (response.status !== 200) {
      return { status: 400, message: "Failed to fetch movies" };
    }
    return { status: 200, message: response.data };
  } catch (error) {
    return { status: 500, message: error.response.data };
  }
};

const getMovieById = async (id) => {
  try {
    const response = await axios.get(`${API.getUri()}/api/v1/movies/${id}`);
    if (response.status !== 200) {
      return { status: 400, message: "Failed to fetch movie details" };
    }
    return { status: 200, message: response.data };
  } catch (error) {
    return { status: 500, message: error.response.data };
  }
};

const createReview = async (movieId, user, body) => {
  try {
    const response = await API.post(
      `${API.getUri()}/api/v1/reviews/${movieId}/${user.id}/create`,
      { body }
    );
    if (response.status === 200) {
      return { status: 200, message: response.data };
    } else {
      return { status: 400, message: response.data.message };
    }
  } catch (error) {
    return { status: 500, message: error.response.data };
  }
};

const LikedMovies = async (movieId, user, setLikedMovies) => {
  const updatedUser = { ...user };
  const updatedLikedMovies = user.likedMovies?.includes(movieId)
    ? dislikeMovie(user.likedMovies, movieId)
    : likeMovie(user.likedMovies, movieId);
  updatedUser.likedMovies = updatedLikedMovies;
  setLikedMovies(updatedUser);
  try {
    const response = await API.post(
      `${API.getUri()}/users/likedMovies`,
      [ ... updatedLikedMovies ]
    );
    if (response.status === 200) {
      return { status: 200, message: "Liked movies updated successfully" };
    } else {
      return { status: 400, message: response.data.message };
    }
  } catch (error) {
    return { status: 500, message: error.response.data };
  }
};

const likeMovie = (likedMovies, movieId) => {
  if (!likedMovies) {
    return [movieId];
  }
  if (likedMovies.includes(movieId)) {
    return likedMovies; // Already liked, no change
  }
  return [...likedMovies, movieId]; // Add movieId to likedMovies
};

const dislikeMovie = (likedMovies, movieId) => {
  if (!likedMovies || !likedMovies.includes(movieId)) {
    return likedMovies; // Not liked, no change
  }
  return likedMovies.filter((id) => id !== movieId); // Remove movieId from likedMovies
};

const getRecommendedMovies = async (user) => {
  try {
    const response = await API.post(
      `${API.getUri()}/api/v1/recommend/`,
       [...user.likedMovies]
      );
      if(response.status === 200){
        return { status: 200, message: response.data };
      } else {
        return { status: 400, message: "Failed to fetch recommended movies" };
      }
  } catch (error) {
    return { status: 500, message: error.response.data };
  }
};

const getVerified = async (email, code) => {
  try{
    const response = await API.post(
      `${API.getUri()}/auth/verify`,
      {email, verificationCode : code}
    );
    if(response.status === 200){
      return { status: 200, message: "User verified successfully" };
    } else {
      return { status: 400, message: response.data.message };
    }
  } catch (error){
    return { status: 500, message: error.response.data };
  }
}

const signin = async (username, email, password) => {
  try {
    const response = await axios.post(`${API.getUri()}/auth/signup`, {
      username,
      email,
      password,
    });
    if (response.status === 200) {
      return { status: 200, message: "User registered successfully" };
    } else {
      return { status: 400, message: response.data.message };
    }
  } catch (error) {
    return { status: 500, message: error.response.data };
  }
}

export {
  LoginUser,
  Logout,
  getMovies,
  getMovieById,
  createReview,
  LikedMovies,
  getRecommendedMovies,
  getVerified,
  signin
};
