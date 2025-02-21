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
    <div className="mt-4 w-full">
      {isLoading ? null : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider {...settings} className=" lg:w-full ">
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
                <img
                  src={image}
                  alt={name}
                  className="w-full h-[400px] md:h-[400px] rounded-lg object-cover "
                />

                <div className="mt-4 flex justify-between p-2">
                  <div className="one w-2/3">
                    <h2 className="">{name}</h2>
                    <p>₹{new Intl.NumberFormat("en-IN").format(price)}</p>
                    <br />
                    <p className="text-[8px] md:text-sm">
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

                    <div className="two">
                      <h1 className="flex items-center w-[9rem] mb-6 text-xs">
                        <FaStar className="text-white mr-2" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center w-[9rem] mb-6 text-xs">
                        <FaShoppingCart className="text-white mr-2" /> Quantity:{" "}
                        {quantity}
                      </h1>
                      <h1 className="flex items-center w-[9rem] mb-6 text-xs">
                        <FaBox className="text-white mr-2" /> In Stock:{" "}
                        {countInStock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};
export default ProductCarousel;
