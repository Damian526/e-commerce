import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AddToCartButton from "../../ui/AddToCartButton";
import { fetchProductDetails } from "../../services/apiProduct";
import ErrorMessage from "../../ui/ErrorMessage";
import useLazyLoadImage from "../../hooks/useLazyLoadImage";
import Loader from "../../ui/Loader";
import ProductReviews from "./ProductReviews"; // Import the reviews component

const ProductDetails = () => {
  const { slug } = useParams(); // Changed from id to slug

  const { data, error, isLoading } = useQuery({
    queryKey: ["productDetails", slug],
    queryFn: () => fetchProductDetails(slug), // Pass the slug instead of id
    retry: false,
  });

  const [setRef, loadedSrc] = useLazyLoadImage(data?.product?.imageUrl);

  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorMessage
        error={error || { message: "An unexpected error occurred" }}
      />
    );

  const product = data.product;

  return (
    <div className="container mx-auto pt-8 text-white bg-slate-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-4 font-karla">
        {/* Attach the ref to the img element */}
        <img ref={setRef} src={loadedSrc} alt={product?.title} />

        <div className="px-2">
          <h2 className="text-2xl">{product?.title}</h2>
          {product?.rating && (
            <div className="mt-2">Rating: {product?.rating}</div>
          )}
          <table className="mt-2">
            <tbody>
              <tr>
                <td className="pr-2 font-bold">Category</td>
                <td>{product?.category}</td>
              </tr>
              <tr>
                <td className="pr-2 font-bold">Stock</td>
                <td>{product?.stock}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2">
            <h2 className="font-bold">About the product</h2>
            <p className="leading-5">{product?.description}</p>
          </div>
          <div className="mt-4">
            <AddToCartButton productId={product?.id} />
          </div>
        </div>
      </div>
      <hr className="mt-4" />

      {/* Include the ProductReviews component */}
      <ProductReviews id={product.id} />

      <br />
    </div>
  );
};

export default ProductDetails;
