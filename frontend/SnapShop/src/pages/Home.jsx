import HeroSection from "./../ui/HeroSection";
import Features from "./../ui/Features";

import { useQuery } from "@tanstack/react-query";

import { fetchLatestProducts } from "../services/apiProduct";
import ProductList from "../features/products/ProductList";
import Loader from "../ui/Loader";
import ErrorMessage from "../ui/ErrorMessage";

const Home = () => {
  const {
    data: newProducts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["latestProducts"],
    queryFn: fetchLatestProducts,
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <div className="bg-slate-800">
      <HeroSection />
      <Features />
      <ProductList title={"New arrivals"} products={newProducts} />
      <br />
    </div>
  );
};

export default Home;
