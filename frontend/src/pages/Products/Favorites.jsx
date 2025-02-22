import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice.js";
import Product from "./Product.jsx";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="mt-15 sm:mt-16 md:mt-20 sm:mx-7 ">
      <h1 className=" text-sm lg:text-lg mx-5">FAVORITE PRODUCTS</h1>
      <div className="mx-1 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 p-4">
        {favorites?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default Favorites;
