import { useGetNewProductsQuery } from "../../redux/api/productApiSlice";
import Message from "../../components/Message.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import { Link } from "react-router";
const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetNewProductsQuery();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoPlaySpeed: 3000,
  };
  return (
    <div className="overflow-hidden mx-1 lg:w-full">
      {isLoading ? null : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider {...settings} className="lg:w-full mx-2 ">
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createdAt,
              numReviews,
              rating,
              quantity,
              countInStock,
            }) => (
              <div key={_id}>
                <Link to={`/product/${_id}`}>
                  <img
                    src={image?.url}
                    alt={name}
                    className="w-full h-[300px] sm:h-[400px] md:h-[450px] rounded-lg object-cover "
                  />

                  <div className="mt-4 flex justify-between p-2">
                    <div className="one w-2/3">
                      <h2 className="truncate">{name}</h2>
                      <p>₹{new Intl.NumberFormat("en-IN").format(price)}</p>
                      <br />
                      <p className="text-xs lg:text-sm md:text-sm">
                        {description.substring(0, 170)}...
                      </p>
                    </div>

                    <div className="flex justify-between w-[50%]">
                      <div className="one">
                        <h1 className=" flex items-center mb-6 w-[9rem] text-xs">
                          <FaStore className="text-white mr-2" /> Brand: {brand}
                        </h1>

                        <h1 className="flex items-center w-[9rem] mb-6 text-xs">
                          <FaClock className="text-white mr-2" /> Added:{" "}
                          {moment(createdAt).fromNow()}
                        </h1>

                        <h1 className=" flex items-center w-[9rem] mb-6 text-xs">
                          <FaStar className="text-white mr-2" />
                          Reviews: {Number(numReviews)}
                        </h1>
                      </div>

                      <div className="two hidden lg:block">
                        <h1 className="flex  items-center w-[9rem] mb-6 text-xs">
                          <FaStar className="text-white mr-2" /> Ratings:{" "}
                          {Math.round(rating)}
                        </h1>
                        <h1 className="flex items-center w-[9rem] mb-6 text-xs">
                          <FaShoppingCart className="text-white mr-2" />{" "}
                          Quantity: {quantity}
                        </h1>
                        <h1 className="flex items-center w-[9rem] mb-6 text-xs">
                          <FaBox className="text-white mr-2" /> In Stock:{" "}
                          {countInStock}
                        </h1>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};
export default ProductCarousel;
