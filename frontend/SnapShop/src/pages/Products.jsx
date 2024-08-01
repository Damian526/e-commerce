import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/apiProduct";
import ProductList from "../ui/ProductList";

const Products = () => {
  const [localFilters, setLocalFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => fetchProducts(filters),
    keepPreviousData: true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFilters({
      category: localFilters.category,
      minPrice: localFilters.minPrice,
      maxPrice: localFilters.maxPrice,
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching products</div>;

  return (
    <div className="container mx-auto p-4">
      <div className="flex">
        <aside className="w-1/4 p-4 bg-slate-800 rounded-lg shadow-md mt-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="category" className="block text-white">
                Category:
              </label>
              <input
                id="category"
                name="category"
                value={localFilters.category}
                onChange={handleFilterChange}
                className="w-full border p-2 rounded bg-white text-black"
                placeholder="e.g., Electronics"
              />
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
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-2 rounded"
            >
              Filter
            </button>
          </form>
        </aside>
        <main className="w-3/4 p-4">
          <ProductList title="Product List" products={products} />
        </main>
      </div>
    </div>
  );
};

export default Products;
