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
    <div className="mt-4">
      {isLoading ? null : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider {...settings} className="lg:w-[400px]">
          {products.map(
            ({
              image,
              _id,
              name,
              price,
              description,
              brand,
              createAt,
              numReviews,
              ratings,
              quantity,
              countInStock,
            }) => (
              <div key={_id} className="border">
                <img
                  src={image}
                  alt={name}
                  className="w-full h-[400px] md:h-[400px] rounded-lg object-cover "
                />

                <div className="mt-4 flex justify-between">
                  <div className="one w-2/3">
                    <h2 className="">{name}</h2>
                    <p>₹{new Intl.NumberFormat("en-IN").format(price)}</p>
                    <br />
                    <p className="text-xs md:text-sm">
                      {description.substring(0, 170)}...
                    </p>
                  </div>

                  <div className="flex justify-between w-1/3">
                    <div className="one">
                      <h1 className="mb-6">
                        <FaStore />
                      </h1>
                      <h1 className="mb-6">
                        <FaStore /> Added {moment(createAt).fromNow()}
                      </h1>
                      <h1 className="mb-6">
                        <FaStore />
                        Brand: {brand}
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
