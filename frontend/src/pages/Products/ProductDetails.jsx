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
import Ratings from "./Ratings.jsx";
import ProductTabs from "./ProductTabs.jsx";

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
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };
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
          <div className="relative">
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
                <p className="text-2xl font-bold">
                  ₹ {Intl.NumberFormat().format(product.price)}
                </p>

                {/* Brand & Other Info */}
                <div className="flex flex-col sm:flex-row  md:items-center sm:justify-between sm:w-[23rem] mt-6">
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

                  <div className="two ">
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

                <div className="flex  flex-wrap">
                  <Ratings
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                  {product.countInStock > 0 && (
                    <div>
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        className="p-1 md:p-2 w-[3rem] md:w-[5rem] border  rounded-lg "
                      >
                        {[...Array(product.countInStock)].map((_, x) => (
                          <option
                            key={x + 1}
                            value={x + 1}
                            className="bg-[#151515] hover:bg-pink-500"
                          >
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    // onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className="bg-pink-600 text-white py-2 px-4 rounded-lg md:mt-0"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-[1rem]  overflow-hidden md:mt-[2rem] xl:mt-[3rem] container flex items-start justify-between ">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                setComment={setComment}
                comment={comment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default ProductDetails;
