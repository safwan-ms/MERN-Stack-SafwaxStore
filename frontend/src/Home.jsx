import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "./redux/api/productApiSlice";
import Loader from "./components/Loader";
import Header from "./components/Header";
import Message from "./components/Message.jsx";
import Error from "./components/Error.jsx";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return <>{!keyword ? <Header /> : null}</>;
};
export default Home;
