import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const SmallProduct = ({ product }) => {
  return (
    <Link
      to={`/product/${product._id}`}
      className="flex justify-center items-center"
    >
      <div className="w-full sm:max-w-[200px] md:max-w-[300px] lg:max-w-[250px] m-[0.5rem] flex flex-col justify-between">
        <div className="relative">
          <HeartIcon product={product} />
          <img
            src={product.image.url}
            alt={product.name}
            className="w-full h-[130px] sm:h-[200px] md:h-[200px] lg:h-[150px] object-cover rounded"
          />
        </div>
        <div className="p-1 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center">
              <h2 className="font-bold text-sm truncate w-full">
                {product.name.substring(0, 30)}...
              </h2>
              <span className="bg-pink-100 text-xs md:text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                ₹{new Intl.NumberFormat("en-IN").format(product.price)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SmallProduct;
