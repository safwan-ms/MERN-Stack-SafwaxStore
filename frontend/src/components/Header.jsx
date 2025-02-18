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
    <div className="mx-7 mt-20">
      {/* For Mobile: Carousel on Top */}
      <div className="w-full lg:hidden lg:w-1/2 mb-6">
        <ProductCarousel />
      </div>

      {/* For Both Mobile and Laptop: Products Below */}
      <div className="grid lg:hidden grid-cols-2 gap-6">
        {data.map((product) => (
          <SmallProduct key={product._id} product={product} />
        ))}
      </div>

      {/* For Laptop: Products with Carousel on the Right */}
      <div className="hidden lg:grid lg:grid-cols-3 gap-6 mt-6">
        <div className="col-span-2 grid grid-cols-2 gap-6">
          {data.map((product) => (
            <SmallProduct key={product._id} product={product} />
          ))}
        </div>
        <div className="w-full lg:w-1/3">
          <ProductCarousel />
        </div>
      </div>
    </div>
  );
};

export default Header;
