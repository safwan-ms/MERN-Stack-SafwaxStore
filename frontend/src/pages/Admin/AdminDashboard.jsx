import Chart from "react-apexcharts";
import { useGetUsersQuery } from "../../redux/api/usersApiSlice.js";
import {
  useGetTotalOrdersQuery,
  useGetTotalSalesByDateQuery,
  useGetTotalSalesQuery,
} from "../../redux/api/orderApiSlice.js";
import { useEffect, useState } from "react";
import OrderList from "./OrderList.jsx";
import Loader from "../../components/Loader.jsx";

const AdminDashboard = () => {
  const { data: sales, isLoading } = useGetTotalSalesQuery();
  const { data: customers } = useGetUsersQuery();
  const { data: orders } = useGetTotalOrdersQuery();
  const { data: salesDetail } = useGetTotalSalesByDateQuery();

  const [state, setState] = useState({
    options: {
      chart: { type: "line" },
      tooltip: { theme: "dark" },
      colors: ["#00E396"],
      dataLabels: { enabled: true },
      stroke: { curve: "smooth" },
      title: { text: "Sales Trend", align: "left" },
      grid: { borderColor: "#ccc" },
      markers: { size: 1 },
      xaxis: { categories: [], title: { text: "Date" } },
      yaxis: { title: { text: "Sales" }, min: 0 },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5,
      },
    },
    series: [{ name: "Sales", data: [] }],
  });

  useEffect(() => {
    if (salesDetail) {
      const formattedSalesDate = salesDetail.map((item) => ({
        x: item._id,
        y: item.totalSales,
      }));

      setState((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          xaxis: {
            categories: formattedSalesDate.map((item) => item.x),
          },
        },
        series: [
          { name: "Sales", data: formattedSalesDate.map((item) => item.y) },
        ],
      }));
    }
  }, [salesDetail]);

  return (
    <>
      <section className="mt-20 px-4 sm:px-6 lg:px-8">
        {/* Dashboard Cards */}
        <div className="w-full flex flex-wrap justify-center gap-6">
          {[
            { label: "Sales", value: sales?.totalSales?.toFixed(2) || 0 },
            { label: "Customers", value: customers?.length || 0 },
            { label: "All Orders", value: orders?.totalOrders || 0 },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-black text-white rounded-lg p-5 w-full max-w-xs sm:max-w-sm lg:max-w-md"
            >
              <div className="font-bold rounded-full w-12 h-12 bg-pink-500 text-center flex items-center justify-center text-lg">
                ₹
              </div>
              <p className="mt-5">{item.label}</p>
              <h1 className="text-xl font-bold">
                {isLoading ? <Loader /> : `₹ ${item.value}`}
              </h1>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="w-full flex justify-center mt-10">
          <div className="w-full max-w-4xl">
            <Chart
              options={state.options}
              series={state.series}
              type="line"
              width="100%"
            />
          </div>
        </div>

        {/* Order List */}
        <div className="mt-10">
          <OrderList />
        </div>
      </section>
    </>
  );
};

export default AdminDashboard;
