import ProductCarousel from "../pages/Products/ProductCarousel";
import SmallProduct from "../pages/Products/SmallProduct";
import { useGetTopProductsQuery } from "../redux/api/productApiSlice";
import Error from "./Error";
import Loader from "./Loader";

const Header = () => {
  const { data, isLoading, error } = useGetTopProductsQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full justify-center items-center">
        <Loader />
      </div>
    );
  }
  if (error) return <Error />;

  return (
    <div className="mt-20">
      {/* For Mobile: Carousel on Top */}
      <div className="w-full lg:hidden mb-6">
        <ProductCarousel />
      </div>

      {/* For Mobile: Small Products Below */}
      <div className="grid lg:hidden grid-cols-2 gap-6 ">
        {data.map((product) => (
          <SmallProduct key={product._id} product={product} />
        ))}
      </div>

      {/* For Laptop: Side-by-Side Layout */}
      <div className="hidden lg:flex lg:space-x-6 mt-6">
        {/* Small Products Section */}
        <div className="w-[45%] grid grid-cols-2 gap-6">
          {data.map((product) => (
            <SmallProduct key={product._id} product={product} />
          ))}
        </div>

        {/* Product Carousel */}
        <div className="flex justify-center w-[50%]">
          <ProductCarousel />
        </div>
      </div>
    </div>
  );
};

export default Header;
