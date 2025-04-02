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
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
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
              <h1 className="mt-14 md:mt-20 text-xl xl:text-2xl mb-4">
                Shopping Cart
              </h1>

              <div className="grid grid-cols-1  lg:grid-cols-2 gap-2 md:gap-6">
                {cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="flex flex-row items-center sm:items-start bg-[#151515] border-b p-2 md:p-4 gap-4"
                  >
                    {/* Product Image */}
                    <div className="w-24  flex flex-col justify-between h-32 md:w-40 md:h-40 ">
                      <img
                        src={item.image?.url}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <div className="sm:hidden mt-2 sm:mt-0 flex  justify-center">
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

                    {/* Product Details */}
                    <div className="flex-1 sm:text-left">
                      <Link
                        to={`/product/${item._id}`}
                        className="text-pink-500 font-semibold text-sm sm:text-lg md:text-xl"
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

                    {/* Quantity Selector & Delete Button Container */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                      {/* Quantity Selector (Properly Aligned) */}
                      <div className="hidden mt-2 sm:mt-0 sm:flex">
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

                      {/* Delete Button (Aligned Properly) */}
                      <button
                        className="text-red-500 hover:text-red-700 transition duration-200"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash size={18} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5">
                <div>
                  <h2>
                    Items(
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)})
                  </h2>

                  <div>
                    ₹
                    {cartItems
                      .reduce((acc, item) => acc + item.qty * item.price, 0)
                      .toFixed(2)}{" "}
                  </div>
                  <button
                    className="rounded-full cursor-pointer mt-4 bg-pink-500 hover:bg-pink-700 duration-200 text-white px-3 py-3 w-full text-sm md:text-lg"
                    disabled={cartItems.length === 0}
                    onClick={checkoutHandler}
                  >
                    Proceed To Checkout
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Cart;
