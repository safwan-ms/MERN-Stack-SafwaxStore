import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "./redux/api/productApiSlice";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Message from "./components/Message.jsx";
import Product from "./pages/Products/Product.jsx";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {!keyword ? <Header /> : null}

      {isLoading ? (
        <Loader className="flex w-screen h-screen justify-center items-center" />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.message}
        </Message>
      ) : (
        <>
          <div className="flex justify-around items-center mt-10 py-10">
            <h1 className="text-2xl">Special Products</h1>
            <Link
              className="bg-pink-500 px-3 md:px-4 py-2 rounded-full"
              to={"/shop"}
            >
              Shop
            </Link>
          </div>

          <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 p-4">
            {data?.product?.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default Home;
