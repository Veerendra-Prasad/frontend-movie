import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getVerified } from "../api/api";
import ToastModal from "../components/ToastModal";
import Loading from "../components/Loading";

const Verify = () => {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((email !== "" && code.length !== 6) || isNaN(code)) {
      setToastMessage("Please enter a valid 6-digit code.");
    }
    setLoading(true);
    const response = await getVerified(email, code);
    if (response.status === 200) {
      setToastMessage(response.message);
      setLoading(false);
      navigate("/login"); // Redirect to login page
    } else {
      setToastMessage(response.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (email === "") {
      navigate("/signup");
      return;
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center mb-4">
          Verify Your Account
        </h1>
        <p className="text-gray-600 text-center mb-6">
          {`  A verification code has been sent to ${email}. Please enter the code below to verify your account.`}
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="code"
              className="block text-gray-700 font-medium mb-2"
            >
              Verification Code
            </label>
            <input
              type="text"
              id="code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              maxLength="6"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter 6-digit code"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Verify
          </button>
        </form>
      </div>
      {toastMessage && (
        <ToastModal
          message={toastMessage}
          onClose={() => setToastMessage("")}
        />
      )}
    </div>
  );
};

export default Verify;
