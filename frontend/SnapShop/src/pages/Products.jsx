import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts, fetchCategories } from "../services/apiProduct";
import ProductList from "../ui/ProductList";
import Pagination from "../ui/Pagination";

const Products = () => {
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
    queryKey: ["products", filters, sortOption, currentPage],
    queryFn: () =>
      fetchProducts({ ...filters, sort: sortOption, page: currentPage, limit }),
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
    setCurrentPage(1); // Reset to first page when filters are applied
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1); // Reset to first page when sort option is changed
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;
 
  const totalPages = Math.ceil(data.totalProducts / limit);
  

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <aside className="w-1/4 p-4 bg-slate-800 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="category" className="block text-white">
                Category:
              </label>
              <select
                id="category"
                name="category"
                value={localFilters.category}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded bg-white text-black"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="minPrice" className="block text-white">
                Min Price:
              </label>
              <input
                type="number"
                id="minPrice"
                name="minPrice"
                value={localFilters.minPrice}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded bg-white text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="maxPrice" className="block text-white">
                Max Price:
              </label>
              <input
                type="number"
                id="maxPrice"
                name="maxPrice"
                value={localFilters.maxPrice}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded bg-white text-black"
              />
            </div>

            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="discount"
                name="discount"
                checked={localFilters.discount}
                onChange={handleFilterChange}
                className="w-4 h-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="discount" className="ml-2 text-white">
                Discount
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Filter
            </button>
          </form>
        </aside>
        <main className="w-3/4 p-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-white">
                Sort By:
              </label>
              <select
                id="sort"
                name="sort"
                value={sortOption}
                onChange={handleSortChange}
                className="border p-2 rounded bg-white text-black"
              >
                <option value="">Default</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="rating">Rating: Low to High</option>
                <option value="-rating">Rating: High to Low</option>
                <option value="-addedAt">Oldest to newest</option>
                <option value="addedAt">Oldest to newest</option>
              </select>
            </div>
          </div>
          <ProductList title="Founded products" products={data.products} />
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
