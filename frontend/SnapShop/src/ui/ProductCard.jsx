import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import AddToCartButton from "./AddToCartButton"; 

// eslint-disable-next-line react/prop-types
const ProductCard = ({ id, category, title, price, rating }) => {
  return (
    <div className="bg-slate-700 rounded-lg shadow-md overflow-hidden">
      <Link to={`/product/${id}`} className="block">
        <img
          src={`https://via.placeholder.com/150`}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="font-bold text-lg text-white">{title}</h3>
          <p className="text-sm text-gray-300">{category}</p>
          <div className="flex items-center mt-2">
            <AiFillStar className="text-yellow-500" />
            <span className="ml-1 text-gray-100">{rating}</span>
          </div>
          <div className="mt-2">
            <span className="font-bold text-xl text-white">${price}</span>
          </div>
          <div className="mt-4">
            <AddToCartButton productId={id} /> {/* Add the button here */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
