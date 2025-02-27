import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice.js";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  return (
    <>
      <div className="">
        {cartItems.length === 0 ? (
          <div className="flex justify-center items-center mt-10">
            <div>
              Your cart is empty <Link to={"/shop"}>Go To Shop</Link>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h1 className="mt-20 text-6xl">Shopping Cart</h1>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Cart;
