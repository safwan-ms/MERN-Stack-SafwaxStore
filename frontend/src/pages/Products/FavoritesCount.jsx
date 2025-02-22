import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="absolute left-5 top-0">
      {favoriteCount > 0 && (
        <span className="text-white bg-pink-500 rounded-full text-xs md:text-base px-2">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};
export default FavoritesCount;
