import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetOrdersQuery } from "../../redux/api/orderApiSlice.js";

const OrderList = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="mt-15 sm:mt-16 lg:mt-20 mx-5 lg:mx-10 overflow-x-auto">
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full">
            <thead className="">
              <tr>
                <th className="py-2 px-4 border-b-2 text-left">ITEMS</th>
                <th className="py-2 px-4 border-b-2 text-left">ID</th>
                <th className="py-2 px-4 border-b-2 text-left">USER</th>
                <th className="py-2 px-4 border-b-2 text-left">DATE</th>
                <th className="py-2 px-4 border-b-2 text-left">TOTAL</th>
                <th className="py-2 px-4 border-b-2 text-left">PAID</th>
                <th className="py-2 px-4 border-b-2 text-left">DELIVERED</th>
                <th className="py-2 px-4 border-b-2"></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-center border-b-2">
                  <td className="py-2 px-4 border-b-2">
                    <img
                      src={order.orderItems[0].image}
                      alt={order._id}
                      className="w-[4rem] sm:w-[5rem] pt-4 mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4 border-b-2 break-words">
                    {order._id}
                  </td>
                  <td className="py-2 px-4 border-b-2">
                    {order.user ? order.user.username : "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b-2">
                    {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b-2">₹{order.totalPrice}</td>
                  <td className="py-2 px-4 border-b-2">
                    {order.isPaid ? (
                      <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full mx-auto">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full mx-auto">
                        Pending
                      </p>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b-2">
                    {order.isDelivered ? (
                      <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full mx-auto">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full mx-auto">
                        Pending
                      </p>
                    )}
                  </td>
                  <td className="px-2 py-2 border-b-2">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-pink-400 text-back py-2 px-3 rounded">
                        More
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default OrderList;
