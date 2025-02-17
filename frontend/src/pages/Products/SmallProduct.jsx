import { Link } from "react-router-dom";

const SmallProduct = ({ product }) => {
  return (
    <div className="w-[20rem]  ml-[2rem] border p-3">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="h-[20rem] w-[20rem] object-cover rounded"
        />
        {/* <HeartIcon product={product}/> */}
        <div className="p-4">
          <Link to={`/product/${product._id}`}>
            <div className="flex justify items between items-center">
              <h2> {product.name.substring(0, 31)}...</h2>
              <span className="bg-pink-100 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                ₹{new Intl.NumberFormat("en-IN").format(product.price)}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SmallProduct;
