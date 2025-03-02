import { useSelector } from "react-redux";

const CartCount = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const cartCount = cartItems.reduce((a, c) => a + c.qty, 0);

  return (
    <div className="absolute left-5 top-0">
      {cartItems.length > 0 && (
        <span className="text-white bg-pink-500 rounded-full text-xs md:text-base px-2">
          {cartCount}
        </span>
      )}
    </div>
  );
};
export default CartCount;
