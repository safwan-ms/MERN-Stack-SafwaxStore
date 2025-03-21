import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice.js";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  return (
    <div className="mt-15 sm:mt-16 lg:mt-20 mx-5 lg:mx-10 overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-2 px-4">IMAGE</th>
                <th className="py-2 px-4">ID</th>
                <th className="py-2 px-4">DATE</th>
                <th className="py-2 px-4">TOTAL</th>
                <th className="py-2 px-4">PAID</th>
                <th className="py-2 px-4">DELIVERED</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-center border-b-2">
                  <td className="py-2 px-4 border-b-2">
                    <img
                      src={order.orderItems[0].image}
                      alt={order.user}
                      className="w-[4rem] sm:w-[6rem] mb-2 mx-auto"
                    />
                  </td>
                  <td className="py-2 px-4 border-b-2 break-words">
                    {order._id}
                  </td>
                  <td className="py-2 px-4 border-b-2">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="py-2 px-4 border-b-2">₹ {order.totalPrice}</td>

                  <td className="py-2 px-4 border-b-2">
                    {order.isPaid ? (
                      <p className="p-1 text-center bg-green-400  rounded-full mx-auto">
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
                      <p className="p-1 text-center bg-green-400  rounded-full mx-auto">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full mx-auto">
                        Pending
                      </p>
                    )}
                  </td>

                  <td className="px-2 py-2 ">
                    <Link to={`/order/${order._id}`}>
                      <button className="bg-pink-400 text-back py-2 px-3 rounded">
                        View Details
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
export default UserOrder;
