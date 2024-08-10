import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import axiosInstance from "../services/axiosInstance";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await axiosInstance.post(
        "users/forgotPassword",
        {
          email,
        },
      );

      if (response.status === 200) {
        setMessage("Password reset link sent to your email!");
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Redirect to login after 3 seconds
      } else {
        setMessage(
          response.data.message || "Something went wrong. Please try again.",
        );
      }
    } catch (error) {
      console.error(
        "Forgot password error:",
        error.response?.data || error.message,
      );
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center font-karla bg-gray-100">
      <div className="relative border shadow rounded p-8 max-w-md w-full bg-slate-800 text-white">
        <h2 className="text-center text-2xl font-bold mb-4">Forgot Password</h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <div className="relative">
            <input
              type="email"
              placeholder="Your email here..."
              className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <FaEnvelope className="absolute top-3 left-2 text-lg" />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700 cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        <p className="text-center mt-4">
          <span className="text-blue-500 cursor-pointer">
            <Link
              to="/login"
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Back to Login
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default ForgotPassword;
