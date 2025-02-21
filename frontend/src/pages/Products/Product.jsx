import { Link } from "react-router-dom";

const Product = ({ product }) => {
  console.log(product);
  return (
    <div className="w-full p-3 ">
      <Link to={`/product/${product._id}`}>
        <div>
          <img
            className="rounded w-[300px] h-[200px] object-cover"
            src={product.image}
            alt={product.name}
          />
          {/* <HeartIcon product={product}/> */}
        </div>

        <div className="p-4">
          <Link to={`/product/${product._id}`}>
            <div className="flex justify-between items-center">
              <h2>{product.name}</h2>
            </div>
          </Link>
        </div>
      </Link>
    </div>
  );
};
export default Product;
