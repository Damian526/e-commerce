import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { useUser } from "../features/authentication/useUser";
import { useQueryClient } from "@tanstack/react-query";
import Search from "../ui/Search";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated } = useUser();
  const queryClient = useQueryClient();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    // Do not clear avatar on logout
    queryClient.removeQueries(["user"]);
  };

  const userName = user?.name || user?.data?.user?.name;
  const avatar =
    localStorage.getItem("avatar") || "https://via.placeholder.com/150";

  return (
    <header className="py-4 bg-slate-800 sticky top-0 z-10 shadow-lg font-karla">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <Link
            to="/"
            className="text-2xl md:text-4xl font-bold text-white"
            data-test="main-logo"
            aria-label="SnapShop Home"
          >
            SnapShop
          </Link>
          <div className="w-full mt-4 md:mt-0 md:w-auto order-2 md:order-1">
            <Search /> {/* Use the Search component here */}
          </div>
          <nav className="flex gap-4 md:gap-8 items-center text-white order-1 md:order-2">
            <Link to="/products" className="text-lg md:text-xl font-bold">
              Products
            </Link>
            <div className="relative">
              {isAuthenticated ? (
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-6 h-6 rounded-full"
                  />
                  <span>{userName || "User"}</span>
                  {menuOpen && (
                    <div className="absolute top-10 right-0 bg-slate-700 rounded-lg shadow-lg py-2">
                      <Link
                        to="/account"
                        className="block px-4 py-2 text-white hover:bg-slate-600"
                      >
                        Account
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block px-4 py-2 text-white hover:bg-slate-600 w-full text-left"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="text-lg md:text-xl font-bold flex items-center gap-2"
                >
                  <FaUser className="text-2xl text-white" />
                  Login
                </Link>
              )}
            </div>
            <div className="relative">
              <Link
                to="/cart"
                className="text-2xl text-white"
                aria-label="View Cart"
              >
                <BsCart />
              </Link>
              <div className="absolute top-[-15px] right-[-10px] bg-red-600 w-[25px] h-[25px] rounded-full text-white text-[14px] grid place-items-center">
                0
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
