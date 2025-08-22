import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ToastModal from "../components/ToastModal";
import { isValidEmail, isValidPassword } from "../utils/validation";
import { signin } from "../api/api";
import Loading from "../components/Loading";

export default function Signup() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(form.email) || form.email === null) {
      setToastMessage("Please enter a valid email address");
      return;
    }
    if (!isValidPassword(form.password) || form.password === null) {
      setToastMessage("Please enter a valid password");
      return;
    }
    if (form.username === null) {
      setToastMessage("Please enter a valid username");
      return;
    }
    setLoading(true);
    const response = await signin(form.username, form.email, form.password);
    if (response.status !== 200) {
      setToastMessage(response.message);
      setLoading(false);
      return;
    }
    setToastMessage("User registered successfully");
    setLoading(false);
    navigate("/verify", { state: { email: form.email } });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-green-300"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Sign Up
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
      {toastMessage && (
        <ToastModal
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
}
