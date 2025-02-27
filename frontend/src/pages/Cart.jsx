import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice.js";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product }));
  };
  return (
    <>
      <div className="">
        {cartItems.length === 0 ? (
          <div className="flex justify-center items-center mt-16 md:mt-20 ">
            <div className="text-sm md:text-lg">
              Your cart is empty{" "}
              <Link to={"/shop"} className="text-pink-500 hover:underline">
                Go To Shop
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="mx-3 md:mx-10 lg:mx-15 ">
              <h1 className="mt-20 text-6xl">Shopping Cart</h1>

              <div className="grid grid-cols-2  lg:grid-cols-2 gap-2 md:gap-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-col sm:flex-row items-center sm:items-start border p-4 rounded-lg gap-4"
                  >
                    {/* Product Image */}
                    <div className="w-32 h-32 md:w-40 md:h-40 flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 sm:text-left">
                      <Link
                        to={`/product/${item._id}`}
                        className="text-pink-500 font-semibold text-xs sm:text-lg md:text-xl"
                      >
                        {item.name}
                      </Link>

                      <div className="text-gray-500 text-xs sm:text-sm md:text-base">
                        {item.brand}
                      </div>

                      <div className="font-bold text-xs md:text-lg mt-1">
                        ₹{Intl.NumberFormat("en-IN").format(item.price)}
                      </div>
                    </div>

                    {/* Quantity Selector (Properly Aligned) */}
                    <div className="mt-2 sm:mt-0">
                      <select
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                        className="p-1 md:p-2 border rounded-md bg-[#151515] text-white"
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Cart;
