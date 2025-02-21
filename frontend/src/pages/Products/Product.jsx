import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="relative bg-[#151515] shadow-lg rounded-lg overflow-hidden">
      <div>
        <img
          className="w-full h-[200px] object-cover"
          src={product.image}
          alt={product.name}
        />
        <HeartIcon product={product} />

        <Link to={`/product/${product._id}`} className="p-4">
          <div className="flex justify-between items-center ]">
            <h2 className="truncate text-lg font-semibold">{product.name}</h2>
            <p className="bg-pink-100 text-pink-800 text-sm font-medium px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
              ₹{new Intl.NumberFormat("en-IN").format(product.price)}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Product;
