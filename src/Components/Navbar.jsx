// components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { UserCircle, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const DEFAULT_AVATAR =
    "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";

  const handleUserClick = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">
            MovieList
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <button onClick={handleUserClick} className="flex items-center">
              {user ? (
                <img
                  src={user.avatarUrl || DEFAULT_AVATAR}
                  alt="User"
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
              ) : (
                <UserCircle className="w-8 h-8" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 bg-gray-800">
          <button
            onClick={handleUserClick}
            className="flex items-center gap-2 pt-2"
          >
            {user ? (
              <>
                <img
                  src={user.avatarUrl || "https://i.pravatar.cc/40"}
                  alt="User"
                  className="w-8 h-8 rounded-full border border-gray-300"
                />
                <span>{user.username}</span>
              </>
            ) : (
              <>
                <UserCircle className="w-6 h-6" />
                <span>Login / Signup</span>
              </>
            )}
          </button>
        </div>
      )}
    </nav>
  );
}
