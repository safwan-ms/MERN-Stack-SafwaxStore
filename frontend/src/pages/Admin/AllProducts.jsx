import { Link } from "react-router";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice.js";
import AdminMenu from "./AdminMenu";
import Loader from "../../components/Loader";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-[#151515]">
        <Loader />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 bg-[#151515] h-screen flex items-center justify-center">
        Error loading products
      </div>
    );
  }

  return (
    <div className="w-full mt-[2.2rem] 2xl:px-[10rem] min-h-screen  p-4 sm:p-6 md:p-8 lg:p-10">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
        All Products ({products.length})
      </h2>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="flex flex-col md:flex-row border border-gray-700 rounded-lg overflow-hidden w-full"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full md:w-1/2 h-60 object-cover"
            />
            <div className="py-6 px-3 md:px-6 flex flex-col justify-between w-full text-white">
              <div className="flex justify-between items-center">
                <h5 className="text-lg md:text-xl font-semibold">
                  {product?.name}
                </h5>
                <p className="text-gray-400 text-xs md:text-sm">
                  {moment(product.createdAt).format("MMMM Do YYYY")}
                </p>
              </div>

              <p className="text-gray-400 text-xs md:text-sm mb-2">
                {product?.description.substring(0, 100)}...
              </p>

              <div className="flex justify-between items-center">
                <Link
                  to={`/admin/product/update/${product._id}`}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-pink-700 rounded-lg hover:bg-pink-800"
                >
                  Update Product
                  <svg
                    className="w-4 h-4 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </Link>
                <p className="md:text-lg font-semibold">${product?.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
