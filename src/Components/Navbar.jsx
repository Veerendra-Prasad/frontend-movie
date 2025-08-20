import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between">
      <Link to="/" className="text-2xl font-bold">🎬 MovieReview</Link>
    </nav>
  );
}