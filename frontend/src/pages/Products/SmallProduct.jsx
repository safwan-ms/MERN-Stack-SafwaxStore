import { Link } from "react-router-dom";

const SmallProduct = ({ product }) => {
  return (
    <div>
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="h-auto rounded"
        />
        {/* <HeartIcon product={product}/> */}
        <div className="p-54">
          <Link to={`/product/${product._id}`}>
            <div className="flex justify items between items-center">
              <h2></h2>
              <span className="bg-pink-100 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                {product.price}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SmallProduct;
