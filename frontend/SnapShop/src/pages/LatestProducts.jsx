import ProductList from "../features/products/ProductList";
import PropTypes from "prop-types";

const LatestProducts = ({ products }) => {
  if (!products) return <div>No products available</div>;
  return <ProductList title="New Arrivals" products={products} />;
};
LatestProducts.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired, // Assuming `products` is an array of objects
};
export default LatestProducts;
