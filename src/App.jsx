import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Loading from "./Components/Loading";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";

const App = () => {
  // Simulating loading state
  const loading = false;

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      )}
    </div>
  );
};

export default App;
