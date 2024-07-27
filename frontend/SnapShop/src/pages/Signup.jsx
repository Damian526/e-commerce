import { useState } from "react";
import { GiArchiveRegister } from "react-icons/gi";
import { Link } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      console.log("Signup successful");
      setError("");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center font-karla bg-gray-100">
      <div
        className="relative border shadow rounded p-8 max-w-md w-full bg-slate-800 text-white"
        data-test="signup-container"
      >
        <div className="flex flex-col items-center mb-4">
          <Link
            to="/"
            className="text-4xl font-bold dark:text-white mb-4"
            data-test="main-logo"
            aria-label="SnapShop Home"
          >
            SnapShop
          </Link>
          <div className="flex mb-2 space-x-2 justify-center items-center">
            <GiArchiveRegister />
            <h3 className="font-bold text-center text-2xl">Register</h3>
            <GiArchiveRegister />
          </div>
        </div>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
          <div className="relative">
            <input
              data-test="input-username"
              type="text"
              placeholder="Your username here..."
              className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="relative">
            <input
              data-test="input-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Your password here..."
              className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
            />
          </div>
          <div className="relative">
            <input
              data-test="input-confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="Confirm your password..."
              className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
            />
          </div>
          <input
            data-test="input-submit"
            type="submit"
            value="Register"
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700 cursor-pointer"
          />
        </form>
        <p className="text-center mt-1">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
