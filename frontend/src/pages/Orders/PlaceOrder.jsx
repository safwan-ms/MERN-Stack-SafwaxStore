import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProgressSteps from "../../components/ProgressStep.jsx";
import Message from "../../components/Message.jsx";
import { useCreateOrderMutation } from "../../redux/api/orderApiSlice";
import Loader from "../../components/Loader.jsx";
import { toast } from "react-toastify";
import { clearCartItems } from "../../redux/features/cart/cartSlice.js";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    }
  }, [cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="mt-[5rem] sm:mt-[6rem]">
      <ProgressSteps step1 step2 step3 />
      <div className="mx-5 lg:mx-10 mt-5">
        {cart.cartItems.length === 0 ? (
          <Message>Your cart is empty</Message>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[600px]">
              <thead>
                <tr className="text-white text-sm sm:text-base">
                  <th className="px-2 py-2 text-left">Image</th>
                  <th className="px-2 py-2 text-left">Product</th>
                  <th className="px-2 py-2 text-center">Qty</th>
                  <th className="px-2 py-2 text-center">Price</th>
                  <th className="px-2 py-2 text-center">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.cartItems.map((item, index) => (
                  <tr key={index} className="text-xs sm:text-sm ">
                    <td className="p-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                      />
                    </td>
                    <td className="p-2">
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </td>
                    <td className="p-2 text-center">{item.qty}</td>
                    <td className="p-2 text-center">
                      ₹
                      {Intl.NumberFormat("en-IN").format(item.price.toFixed(2))}
                    </td>
                    <td className="p-2 text-center">
                      ₹
                      {Intl.NumberFormat("en-IN").format(
                        (item.qty * item.price).toFixed(2)
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-8">
          <h2 className="mb-3 font-semibold md:mb-5 text-sm md:text-lg xl:text-2xl">
            Order Summary
          </h2>
          <div className="flex justify-between flex-wrap p-4 md:p-8 bg-[#181818]">
            <ul className="text-lg">
              <li className="text-xs md:text-sm xl:text-lg ">
                <span className="font-semibold mb-4">Items: </span> ₹
                {Intl.NumberFormat("en-IN").format(cart.itemsPrice)}
              </li>
              <li className="text-xs md:text-sm xl:text-lg">
                <span className=" font-semibold mb-4">Shipping: </span> ₹
                {Intl.NumberFormat("en-IN").format(cart.shippingPrice)}
              </li>
              <li className="text-xs md:text-sm xl:text-lg ">
                <span className="font-semibold mb-4">Tax: </span> ₹
                {Intl.NumberFormat("en-IN").format(cart.taxPrice)}
              </li>
              <li className="text-xs md:text-sm xl:text-lg">
                <span className=" font-semibold mb-4">Total: </span> ₹
                {Intl.NumberFormat("en-IN").format(cart.totalPrice)}
              </li>
            </ul>
            {error && <Message variant="danger"> {error.data.message}</Message>}
            <div>
              <div className="text-md md:text-lg xl:text-2xl mt-3 font-bold">
                Shipping
              </div>
              <p className="text-xs md:text-sm xl:text-lg ">
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city}{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </div>
            <div>
              <h2 className=" mb-3 font-semibold md:mb-5 text-md mt-3 md:text-lg xl:text-2xl">
                Payment Method
              </h2>
              <strong>Method: </strong> {cart.paymentMethod}
            </div>
          </div>

          <button
            className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4"
            type="button"
            disabled={cart.cartItems === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
          {isLoading && <Loader />}
        </div>
      </div>
    </div>
  );
};
export default PlaceOrder;
