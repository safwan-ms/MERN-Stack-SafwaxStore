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
    <>
      <div className="flex justify-around">
        <div className="xl:block lg:hidden md:hidden:sm:hidden">
          <div className="grid grid-cols-2">
            {data.map((product) => (
              <div key={product._id}>
                <SmallProduct product={product} />
              </div>
            ))}
          </div>
        </div>

        <ProductCarousel />
      </div>
    </>
  );
};
export default Header;
