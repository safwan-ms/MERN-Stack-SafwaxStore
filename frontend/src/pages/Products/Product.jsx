import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <div className="mx-10 p-3 grid ">
      <div>
        <img
          className="rounded w-200px"
          src={product.image}
          alt={product.name}
        />
      </div>
    </div>
  );
};
export default Product;
