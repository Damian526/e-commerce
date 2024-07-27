import { useState } from "react";
import { FaUnlock } from "react-icons/fa";
import { RiLockPasswordFill, RiUser3Fill } from "react-icons/ri";
import { Link } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for form submission logic
    if (username === "atuny0" && password === "9uQFF1Lh") {
      console.log("Login successful");
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center font-karla bg-gray-100">
      <div
        className="relative border shadow rounded p-8 max-w-md w-full bg-slate-800 text-white"
        data-test="login-container"
      >
        <>
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
              <FaUnlock />
              <h3 className="font-bold text-center text-2xl">Login</h3>
              <FaUnlock />
            </div>
          </div>
          {error && (
            <div className="text-red-500 text-center mb-4">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <div className="relative">
              <input
                data-test="input-username"
                type="text"
                placeholder="Your username here... (atuny0)"
                className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <RiUser3Fill className="absolute top-3 left-2 text-lg" />
            </div>
            <div className="relative">
              <input
                data-test="input-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Your password here... (9uQFF1Lh)"
                className="border w-full border-black py-2 px-8 rounded dark:bg-slate-600"
              />
              <RiLockPasswordFill className="absolute top-3 left-2 text-lg" />
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="rememberMe" className="mr-2" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
            <input
              data-test="input-submit"
              type="submit"
              value="Submit"
              className="bg-blue-500 text-white rounded p-2 hover:bg-blue-700 cursor-pointer"
            />
          </form>
          <p className="text-center mt-1">
            <Link
              to="/forgot-password"
              className="text-blue-500 hover:underline"
            >
              Forgot your password?
            </Link>
          </p>
          <p className="text-center mt-1">
            No Account?{" "}
            <Link
              to="/signup"
              className="text-blue-500 cursor-pointer hover:underline"
            >
              Register
            </Link>
          </p>
        </>
      </div>
    </div>
  );
}

export default Login;
