import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon.jsx";
const Product = ({ product }) => {
  return (
    <div className="bg-[#151515] relative shadow-lg rounded-lg overflow-hidden">
      <HeartIcon product={product} />
      <Link to={`/product/${product._id}`}>
        <img
          className="w-full h-[150px] sm:h-[200px] object-cover"
          src={product.image.url}
          alt={product.name}
        />

        <div className=" px-2 py-3 ">
          <div className="flex justify-between items-center ]">
            <h2 className="truncate text-xs sm:text-lg font-semibold">
              {product.name}
            </h2>
            <p className="bg-pink-100 text-pink-800 text-[10px] sm:text-xs font-medium px-1 sm:px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ₹{new Intl.NumberFormat("en-IN").format(product.price)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};
export default Product;
