import { useState, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { debounce } from "lodash";
import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { fetchProductsByQuery } from "../services/apiProduct";

const Search = () => {
  const [query, setQuery] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isDropdownVisible, setIsDropdownVisible] = useState(true);
  const navigate = useNavigate();

  // Define debouncedSetSearchTerm using useCallback with setSearchTerm as a dependency
  const debouncedSetSearchTerm = useCallback(
    debounce((term) => setSearchTerm(term), 300),
    [setSearchTerm], // Listing setSearchTerm as a dependency
  );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setIsDropdownVisible(true);
    if (value.length >= 2) {
      debouncedSetSearchTerm(value);
    } else {
      setSearchTerm("");
    }
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["searchProducts", searchTerm],
    queryFn: () => fetchProductsByQuery(searchTerm),
    enabled: !!searchTerm,
    keepPreviousData: true,
    select: (data) => ({
      ...data,
      data: {
        ...data.data,
        products: data.data.products.slice(0, 8),
      },
    }),
  });

  const handleSearchClick = () => {
    setIsDropdownVisible(false);
    navigate(`/products?search=${query}`);
  };

  const handleKeyDown = (e) => {
    const resultsLength = data ? data.data.products.length : 0;
    const totalLength = resultsLength + 1; // including the last option(current search query)

    if (data && resultsLength > 0) {
      if (e.key === "ArrowDown") {
        setFocusedIndex((prevIndex) => (prevIndex + 1) % totalLength);
      } else if (e.key === "ArrowUp") {
        setFocusedIndex((prevIndex) =>
          prevIndex === 0 ? totalLength - 1 : prevIndex - 1,
        );
      } else if (e.key === "Enter") {
        if (focusedIndex >= 0 && focusedIndex < resultsLength) {
          navigate(`/product/${data.data.products[focusedIndex].id}`);
        } else if (focusedIndex === resultsLength) {
          handleSearchClick();
        }
        setIsDropdownVisible(false);
      } else if (e.key === "Escape") {
        setIsDropdownVisible(false);
      }
    }
  };

  useEffect(() => {
    setFocusedIndex(-1);
  }, [data]);

  return (
    <div className="w-full max-w-full md:max-w-[500px] relative flex">
      <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search" className="sr-only">
          Search for a product
        </label>
        <input
          id="search"
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search for a product..."
          className="border-2 border-blue-500 px-4 md:px-6 py-2 w-full text-black md:text-white dark:bg-slate-800"
        />
        <button
          type="button"
          onClick={handleSearchClick}
          className="bg-blue-500 text-white text-[24px] md:text-[26px] grid place-items-center px-2 md:px-4"
          aria-label="Search"
        >
          <BsSearch />
        </button>
      </form>
      {isLoading && (
        <div className="absolute bg-gray-800 text-white p-2 md:p-4 rounded shadow-lg top-full mt-2 w-full">
          Loading...
        </div>
      )}
      {error && (
        <div className="absolute bg-gray-800 text-white p-2 md:p-4 rounded shadow-lg top-full mt-2 w-full">
          Error: {error.message}
        </div>
      )}
      {data && data.data.products.length > 0 && isDropdownVisible && (
        <div className="absolute bg-gray-800 text-white p-2 md:p-4 rounded shadow-lg top-full mt-2 w-full">
          {data.data.products.map((product, index) => (
            <Link
              to={`/product/${product.id}`}
              key={product.id}
              className={`block ${index === focusedIndex ? "bg-gray-700" : ""}`}
              onClick={() => setIsDropdownVisible(false)}
            >
              <div className="border-b border-gray-700 p-2 flex items-center hover:bg-gray-700 transition duration-150">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-8 h-8 md:w-12 md:h-12 object-cover rounded mr-2"
                />
                <div>
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-sm text-gray-300">${product.price}</div>
                </div>
              </div>
            </Link>
          ))}
          <Link
            to={`/products?search=${query}`}
            className={`block p-2 text-white hover:bg-gray-700 transition duration-150 ${
              focusedIndex === data.data.products.length ? "bg-gray-700" : ""
            }`}
            onClick={() => setIsDropdownVisible(false)}
          >
            <div className="flex items-center ">
              <BsSearch className="mr-2 text-white" /> {query}
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Search;
