import { Link } from "react-router-dom";

const Product = ({ product }) => {
  console.log(product);
  return (
    <div className="w-full border p-3 ">
      <div>
        <img
          className="rounded w-[300px] h-[200px] object-cover"
          src={product.image}
          alt={product.name}
        />
      </div>
    </div>
  );
};
export default Product;
