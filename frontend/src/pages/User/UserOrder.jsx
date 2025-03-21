import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery } from "../../redux/api/orderApiSlice.js";

const UserOrder = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  return (
    <div className="mt-15 sm:mt-16 lg:mt-20 mx-5 lg:mx-10"> UserOrder</div>
  );
};
export default UserOrder;
