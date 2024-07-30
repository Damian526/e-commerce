import ProductList from './ProductList';

// eslint-disable-next-line react/prop-types
const LatestProducts = ({ products }) => {
  if (!products) return <div>No products available</div>;
  return <ProductList title="New Arrivals" products={products} />;
};

export default LatestProducts;