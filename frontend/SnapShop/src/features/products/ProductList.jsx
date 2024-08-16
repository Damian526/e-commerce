import PropTypes from "prop-types";
import ProductCard from "./ProductCard";

const ProductList = ({ title, products }) => (
  <div className="container mx-auto px-4 mt-4 bg-slate-800">
    <div className="sm:flex items-center justify-between">
      <h2 className="text-4xl font-medium font-karla text-white">{title}</h2>
    </div>
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4"
      data-test="product-list-container"
    >
      {products?.map((product) => (
        <ProductCard
          key={product._id}
          id={product._id}
          slug={product.slug}
          category={product.category}
          name={product.name}  
          price={product.price}
          priceDiscount={product.priceDiscount}
          rating={product.rating}
          image={product.imageUrl}
        />
      ))}
    </div>
  </div>
);

ProductList.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,  
      price: PropTypes.number.isRequired,
      priceDiscount: PropTypes.number,
      rating: PropTypes.number.isRequired,
      imageUrl: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ProductList;
