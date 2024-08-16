/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import AddToCartButton from "../../ui/AddToCartButton";

const ProductCard = ({
  slug, // Use slug instead of id
  category,
  title,
  price,
  priceDiscount,
  rating,
  image,
}) => {
  // Calculate discount percentage
  const discountPercentage = priceDiscount
    ? ((price - priceDiscount) / price) * 100
    : 0;
 
  return (
    <div className="bg-slate-700 rounded-lg shadow-md overflow-hidden flex flex-col">
      <Link to={`/product/${slug}`} className="block">
        {" "}
        {/* Use slug in the URL */}
        <img src={image} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4 flex-grow">
          <h3 className="font-bold text-lg text-white">{title}</h3>
          <p className="text-sm text-gray-300">{category}</p>
          <div className="flex items-center mt-2">
            <AiFillStar className="text-yellow-500" />
            <span className="ml-1 text-gray-100">{rating}</span>
          </div>
          <div className="mt-2">
            {priceDiscount ? (
              <div>
                <span className="font-bold text-xl text-white">
                  ${priceDiscount}
                </span>
                <span className="ml-2 text-sm text-gray-400 line-through">
                  ${price}
                </span>
                <div className="text-sm text-red-400">
                  {discountPercentage.toFixed(2)}% off
                </div>
              </div>
            ) : (
              <span className="font-bold text-xl text-white">${price}</span>
            )}
          </div>
        </div>
      </Link>
      <div className="p-4 mt-auto">
        <AddToCartButton productId={slug} />{" "}
        {/* Ensure AddToCart uses the correct ID or slug as needed */}
      </div>
    </div>
  );
};

export default ProductCard;
