import React, { useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import CountUp from "react-countup";

const dummyOrders = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    quantity: 2,
    customer: "John Doe",
    status: "Pending",
    image:
      "https://m.media-amazon.com/images/I/51sWxhvZ5DL._AC_SX300_SY300_QL70_ML2_.jpg",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 800,
    quantity: 1,
    customer: "Alice Smith",
    status: "Shipped",
    image:
      "https://m.media-amazon.com/images/I/61rK2UbzFTL._AC_SY300_SX300_QL70_ML2_.jpg",
  },
  {
    id: 3,
    name: "Headphones",
    price: 150,
    quantity: 3,
    customer: "Bob Johnson",
    status: "Delivered",
    image:
      "https://m.media-amazon.com/images/I/51oAjwCzv4L._AC_UL480_FMwebp_QL65_.jpg",
  },
  // باقي الـ orders زي ما هو
];

const Orders = () => {
  const [orders, setOrders] = useState(dummyOrders);

  const handleDelete = (id) => {
    setOrders(orders.filter((o) => o.id !== id));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-400 text-black";
      case "Shipped":
        return "bg-blue-500 text-white";
      case "Delivered":
        return "bg-green-500 text-white";
      case "Cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-900 min-h-screen">
      <AdminNavbar className="w-full" />
      <h1 className="text-3xl font-bold mb-6 text-center mt-10 text-white">
        Orders
      </h1>

      <div className="overflow-x-auto w-full px-6 sm:px-10 pb-10">
        <table className="min-w-full bg-gray-800 shadow rounded-lg min-w-full bg-gray-800 shadow rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-white">
              <th className="py-2 px-4 text-left">ID</th>
              <th className="py-2 px-4 text-left">Image</th>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Customer</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-t border-gray-700 text-white"
              >
                <td className="py-2 px-4">{order.id}</td>
                <td className="py-2 px-4">
                  <img
                    src={order.image}
                    alt={order.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-4">{order.name}</td>
                <td className="py-2 px-4">
                  $<CountUp end={order.price} duration={2} separator="," />
                </td>
                <td className="py-2 px-4">
                  <CountUp end={order.quantity} duration={1} separator="," />
                </td>
                <td className="py-2 px-4">{order.customer}</td>
                <td className="py-2 px-4">
                  <span
                    className={`px-2 py-1 rounded text-sm font-semibold ${getStatusColor(
                      order.status,
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
