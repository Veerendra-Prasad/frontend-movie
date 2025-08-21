import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If access token expired and refresh not tried yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call backend refresh endpoint (cookie auto-sent)
        const res = await axios.post(
          `${API.getUri()}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;

        // Save new token
        localStorage.setItem("token", newToken);

        // Update header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return API(originalRequest);

      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // Optional: logout user
        localStorage.removeItem("token");
        localStorage.removeItem("user")
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default API;