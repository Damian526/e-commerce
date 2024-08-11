import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../services/axiosInstance";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await axiosInstance.patch(
        `/users/resetPassword/${token}`,
        {
          password,
          passwordConfirm,
        }
      );

      if (response.status === 200) {
        setMessage("Password reset successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 3000); // Redirect to login after 3 seconds
      } else {
        setMessage(
          response.data.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error(
        "Reset password error:",
        error.response?.data || error.message
      );
      setMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center font-karla bg-gray-100">
      <div className="relative border shadow rounded p-8 max-w-md w-full bg-slate-800 text-white">
        <h2 className="text-center text-2xl font-bold mb-4">Reset Password</h2>
        {message && <p className="text-center text-red-500">{message}</p>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <input
            type="password"
            placeholder="New password"
            className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700 cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
