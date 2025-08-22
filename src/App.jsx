import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import User from "./pages/User";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import GuestRoute from "./components/GuestRoute";
import RecommendationPage from "./pages/RecommendationPage";
import NotFound from "./components/NotFound";
import Verify from "./pages/Verify";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify" element={<Verify />} />
        </Route>

        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/recommend" element={<RecommendationPage />} />
          <Route path="/user" element={<User />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
