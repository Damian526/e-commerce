/* eslint-disable react/prop-types */

import ProductCard from "./ProductCard";

const ProductList = ({ title, products }) => (
  <div className="container mt-8 mx-auto px-4 bg-slate-800">
    <div className="sm:flex items-center justify-between">
      <h2 className="text-4xl font-medium font-lora text-white">
        {title}
      </h2>
    </div>
    <div
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4"
      data-test="product-list-container"
    >
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          category={product.category}
          title={product.name}
          price={product.price}
          rating={product.rating}
        />
      ))}
    </div>
  </div>
);

export default ProductList;
