import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../services/apiProduct";
import ProductList from "../features/products/ProductList";
import Pagination from "../features/products/Pagination";
import { useLocation } from "react-router-dom";

// Helper function to get query parameters from the URL
const useQueryParams = () => {
  return new URLSearchParams(useLocation().search);
};

const Products = () => {
  const queryParams = useQueryParams();
  const searchQuery = queryParams.get("search") || "";

  const [localFilters, setLocalFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    discount: false,
  });
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    discount: false,
  });
  const [sortOption, setSortOption] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [limit, setLimit] = useState(8);

  useEffect(() => {
    const getCategories = async () => {
      const { data } = await fetchCategories();
      setCategories(data.categories);
    };

    getCategories();
  }, []);

  const { data, isLoading, error } = useQuery({
    queryKey: ["products", filters, sortOption, currentPage, searchQuery],
    queryFn: () =>
      fetchProducts({
        ...filters,
        sort: sortOption,
        page: currentPage,
        limit,
        search: searchQuery,
      }),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000,
  });

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters({
      category: localFilters.category,
      minPrice: localFilters.minPrice,
      maxPrice: localFilters.maxPrice,
      discount: localFilters.discount,
    });
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  const totalPages = Math.ceil(data.totalProducts / limit);

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col lg:flex-row">
        <aside className="w-full lg:w-1/4 p-4 bg-slate-800 rounded-lg shadow-md mb-4 lg:mb-0">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="category"
                className="block text-white font-semibold mb-2"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={localFilters.category}
                key={localFilters.category}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 bg-white text-black rounded-lg"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="minPrice"
                className="block text-white font-semibold mb-2"
              >
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={localFilters.minPrice}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 bg-white text-black rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="maxPrice"
                className="block text-white font-semibold mb-2"
              >
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={localFilters.maxPrice}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 bg-white text-black rounded-lg"
              />
            </div>
            <div className="mb-4 flex items-center">
              <input
                type="checkbox"
                id="discount"
                name="discount"
                checked={localFilters.discount}
                onChange={handleFilterChange}
                className="mr-2"
              />
              <label htmlFor="discount" className="text-white font-semibold">
                On Sale
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Apply Filters
            </button>
          </form>
        </aside>
        <main className="w-full lg:w-3/4 p-4">
          <div className="mb-4">
            <label
              htmlFor="sortOption"
              className="block text-white font-semibold mb-2"
            >
              Sort By
            </label>
            <select
              id="sortOption"
              value={sortOption}
              onChange={handleSortChange}
              className="w-full px-4 py-2 bg-white text-black rounded-lg"
            >
              <option value="">Default</option>
              <option value="price">Price: Low to High</option>
              <option value="-price">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
              <option value="addedAt">Oldest to Latest</option>
              <option value="-addedAt">Latest to Oldest</option>
            </select>
          </div>
          <ProductList products={data.products} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
};

export default Products;
