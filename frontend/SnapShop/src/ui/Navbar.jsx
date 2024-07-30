import { Link } from "react-router-dom";
import { BsSearch, BsCart } from "react-icons/bs";
import { FaUser } from "react-icons/fa";

function Navbar() {
  const username = ""; // Replace with your actual username logic

  return (
    <header className="py-4 bg-slate-800 sticky top-0 z-10 shadow-lg font-karla">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-4xl font-bold dark:text-white"
            data-test="main-logo"
            aria-label="SnapShop Home"
          >
            SnapShop
          </Link>
          <div className="lg:flex hidden w-full max-w-[500px]">
            <label htmlFor="search" className="sr-only">
              Search for a product
            </label>
            <input
              id="search"
              type="text"
              placeholder="Search for a product..."
              className="border-2 border-blue-500 px-6 py-2 w-full text-white dark:bg-slate-800"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white text-[26px] grid place-items-center px-4"
              aria-label="Search"
            >
              <BsSearch />
            </button>
          </div>
          <nav
            className="flex gap-4 md:gap-8 items-center text-white"
            aria-label="Main Navigation"
          >
            <Link to="/products" className="text-xl font-bold">
              Products
            </Link>
            <Link to="/categories" className="text-xl font-bold">
              Categories
            </Link>
            <div className="flex items-center gap-2">
              {username !== "" ? (
                <img
                  src="https://robohash.org/Terry.png?set=set4"
                  alt="User Avatar"
                  className="w-6"
                />
              ) : (
                <FaUser className=" text-2xl text-white" />
              )}
              <div className="text-white text-2xl">
                {username === "" && (
                  <Link to="/login" className="text-xl font-bold">
                    Login
                  </Link>
                )}
              </div>
            </div>
            <div className="relative">
              <Link
                to="/cart"
                className="text-2xl  text-white"
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
