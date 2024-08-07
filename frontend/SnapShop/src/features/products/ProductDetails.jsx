import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import AddToCartButton from "../../ui/AddToCartButton";
import { fetchProductDetails } from "../../services/apiProduct";

const ProductDetails = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => fetchProductDetails(id),
    retry: false, // Disable automatic retries
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const product = data.product;

  return (
    <div className="container mx-auto pt-8 text-white bg-slate-600">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-4 font-karla">
        <img src={product.imageUrl} alt={product.imageUrl} />

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
      <br />
    </div>
  );
};

export default ProductDetails;
