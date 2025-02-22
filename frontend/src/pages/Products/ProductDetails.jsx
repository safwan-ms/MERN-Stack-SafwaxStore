import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice.js";
import Loader from "../../components/Loader";
import Message from "../../components/Message.jsx";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import HeartIcon from "./HeartIcon";
import moment from "moment";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  return (
    <>
      <div className="mt-15 sm:mt-16 md:mt-20">
        <Link
          to={"/"}
          className="mt-15 mx-4 sm:mx-6 md:mx-8 sm:mt-16 md:mt-20 text-white font-semibold hover:underline "
        >
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error?.data?.message || error.message}</Message>
      ) : (
        <>
          <div className="relative mx-auto p-4">
            <div className="absolute top-8 lg:top-4 right-8 ">
              <HeartIcon product={product} />
            </div>
            <div className="flex flex-col md:flex-row gap-8 items-start p-6 ">
              {/* Product Image & Wishlist Icon */}
              <div className=" w-full md:w-1/2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-auto object-cover "
                />
              </div>

              {/* Product Details */}
              <div className="w-full md:w-1/2 space-y-4">
                <h1 className="text-2xl font-bold text-white">
                  {product.name}
                </h1>
                <p className="text-gray-300">{product.description}</p>
                <p className="text-2xl text-pink-600 font-bold">
                  ₹{Intl.NumberFormat().format(product.price)}
                </p>

                {/* Brand & Other Info */}
                <div className="flex items-center justify-between w-[23rem] border ">
                  <div className="one">
                    <h1 className="flex items-center mb-6">
                      <FaStore className="text-white mr-2" />
                      <span>Brand: {product.brand}</span>
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaClock className="text-white mr-2" />
                      <span>Added: {moment(product.createdAt).fromNow()}</span>
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaStore className="text-white mr-2" />
                      <span>Reviews: {product.numReviews}</span>
                    </h1>
                  </div>

                  <div className="two">
                    <h1 className="flex items-center mb-6">
                      <FaStore className="text-white mr-2" />
                      Ratings: {product.rating}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaBox className="text-white mr-2" />
                      In Stock: {product.countInStock}
                    </h1>
                    <h1 className="flex items-center mb-6">
                      <FaShoppingCart className="text-white mr-2" />
                      Quantity: {product.quantity}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ProductDetails;
