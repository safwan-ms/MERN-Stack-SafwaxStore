import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice.js";
import SmallProduct from "./SmallProduct.jsx";
import Loader from "../../components/Loader";
import { useState } from "react";
import "../../index.css";
import { toast } from "react-toastify";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  rating,
  setRating,
  comment,
  setComment,
  product,
  submitHandler,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  return (
    <div className="flex flex-col md:flex-row border p-4 w-full overflow-hidden">
      <section className="mr-2 flex md:flex-col w-full md:w-auto">
        <div
          onClick={() => handleTabClick(1)}
          className={`${
            activeTab === 1 ? "font-bold" : ""
          } flex-1 p-2 md:p-4 text-sm cursor-pointer text-center md:text-left`}
        >
          Write your own Review
        </div>
        <div
          onClick={() => handleTabClick(2)}
          className={`${
            activeTab === 2 ? "font-bold" : ""
          } flex-1 p-2 md:p-4 text-sm cursor-pointer text-center md:text-left`}
        >
          All Reviews
        </div>
        <div
          onClick={() => handleTabClick(3)}
          className={`${
            activeTab === 3 ? "font-bold" : ""
          } flex-1 p-2 md:p-4 text-sm cursor-pointer text-center md:text-left`}
        >
          Related Products
        </div>
      </section>

      <section
        className={`${activeTab === 1 ? "w-screen" : ""} border overflow-auto`}
      >
        {activeTab === 1 && (
          <div className="mt-4">
            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-4">
                <div>
                  <label htmlFor="rating" className="block text-sm mb-2">
                    Ratings
                  </label>
                  <select
                    id="rating"
                    required
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="p-2 w-full border rounded-lg bg-[#151515]"
                  >
                    <option value="">Select</option>
                    <option value="1">Inferior</option>
                    <option value="2">Decent</option>
                    <option value="3">Great</option>
                    <option value="4">Excellent</option>
                    <option value="5">Exceptional</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm">Comment</label>
                  <textarea
                    id="comment"
                    rows="3"
                    required
                    value={comment}
                    className="p-2 w-full border text-sm rounded-lg"
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={loadingProductReview}
                  className="bg-pink-600 py-2 px-4 rounded-lg w-full md:w-auto"
                >
                  Submit
                </button>
              </form>
            ) : (
              <p className="text-center">
                Please{" "}
                <Link to="/login" className="text-blue-500">
                  sign in
                </Link>{" "}
                to write a review
              </p>
            )}
          </div>
        )}
      </section>

      <section
        className={`${
          activeTab === 2 ? "w-screen" : ""
        } border p-4 overflow-auto`}
      >
        {activeTab === 2 && (
          <>
            {product.reviews.length === 0 ? (
              <p className="text-center">No Reviews</p>
            ) : (
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div key={review._id} className="border rounded-lg">
                    <strong>{review.name}</strong>
                    <p className="text-xs text-gray-500">
                      {review.createdAt.substring(0, 10)}
                    </p>
                    <p className="mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};
export default ProductTabs;
