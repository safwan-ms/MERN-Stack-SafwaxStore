import { Link } from "react-router-dom";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[150px] md:w-[200px] h-[200px] md:h-[300px] m-[0.5rem]  flex flex-col justify-between">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-[150px] md:h-[200px] w-[150px] md:w-[200px] object-cover rounded"
        />
      </div>
      <div className="p-1 flex-1 flex flex-col justify-between">
        <Link to={`/product/${product._id}`}>
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-sm w-[170px]">
              {product.name.substring(0, 15)}...
            </h2>
            <span className="bg-pink-100 text-xs md:text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ₹{new Intl.NumberFormat("en-IN").format(product.price)}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default SmallProduct;
