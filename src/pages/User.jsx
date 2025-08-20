import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const {logout } = useAuth();
  const navigate = useNavigate();

  // if (!user) {
  //   navigate("/login");
  //   return null;
  // }

  const user = {
    username: "JohnDoe",
    email: " ",
    avatarUrl: "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff",
  }

  const DEFAULT_AVATAR =
    "https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff";

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6">
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {/* Avatar */}
        <img
          src={user.avatarUrl || DEFAULT_AVATAR}
          alt="User"
          className="w-24 h-24 rounded-full border"
        />

        {/* Info */}
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-bold">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>

          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
