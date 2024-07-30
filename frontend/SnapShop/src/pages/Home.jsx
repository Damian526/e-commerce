import HeroSection from "./../ui/HeroSection";
import Features from "./../ui/Features";
import LatestProducts from "./../ui/LatestProducts";
import { useQuery } from "@tanstack/react-query";

import { fetchLatestProducts } from "../services/apiProduct";


const Home = () => {
  
  const {
    data: newProducts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["latestProducts"],
    queryFn: fetchLatestProducts,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="bg-slate-800">
      <HeroSection />
      <Features />
      <LatestProducts products={newProducts} />
      <br />
    </div>
  );
};

export default Home;
