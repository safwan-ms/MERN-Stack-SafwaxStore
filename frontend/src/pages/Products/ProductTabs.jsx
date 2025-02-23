import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";
import { useGetTopProductsQuery } from "../../redux/api/productApiSlice.js";
import SmallProduct from "./SmallProduct.jsx";
import Loader from "../../components/Loader";
import { useState } from "react";

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  rating,
  setRating,
  comment,
  product,
  submitHandler,
}) => {
  const { data, isLoading } = useGetTopProductsQuery();
  const [activeTab, setActiveTab] = useState(1);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex justify-between border w-[40rem]">
      <section className="mr-2 w-1/2">
        <div
          //  onClick={handleTabClick(1)}
          className={`${
            activeTab === 1 ? "font-bold" : ""
          } flex-1  p-4 cursor-pointer`}
        >
          Write your own Review
        </div>
        <div
          //  onClick={handleTabClick(2)}
          className={`${
            activeTab === 2 ? "font-bold" : ""
          } flex-1  p-4 cursor-pointer`}
        >
          All Reviews
        </div>
        <div
          //  onClick={handleTabClick(3)}
          className={`${
            activeTab === 3 ? "font-bold" : ""
          } flex-1  p-4 cursor-pointer`}
        >
          Related Products{" "}
        </div>
      </section>

      {/* Second Part  */}
      <section className="border w-1/2">
        {activeTab === 1 && (
          <div className="mt-4 ">
            {userInfo ? (
              <form onSubmit={submitHandler}>
                <div className="my-2">
                  <label htmlFor="rating" className="block  mb-2">
                    Ratings
                  </label>

                  <select
                    id="rating"
                    required
                    value={rating}
                    onClick={(e) => setRating(e.target.value)}
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
              </form>
            ) : (
              <p>
                Please <Link to={"/login"}>sign in</Link>to write a review
              </p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
export default ProductTabs;
