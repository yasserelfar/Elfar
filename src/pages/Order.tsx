import React, { useState, useMemo } from "react";
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
  {
    id: 4,
    name: "Keyboard",
    price: 75,
    quantity: 2,
    customer: "Daniel Brown",
    status: "Cancelled",
    image:
      "https://m.media-amazon.com/images/I/51lC3Y0s+0L._AC_SY300_SX300_QL70_ML2_.jpg",
  },
];

const Orders = () => {
  const [orders] = useState(dummyOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // فلترة البيانات
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.name.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

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

      <h1 className="text-3xl font-bold mb-6 mt-10 text-white">Orders</h1>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-4 w-full px-6 sm:px-10 mb-6">
        <input
          type="text"
          placeholder="Search by product or customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 w-full"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-2 rounded bg-gray-800 text-white border border-gray-600"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto w-full px-6 sm:px-10 pb-10">
        <table className="min-w-full bg-gray-800 shadow rounded-lg">
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
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
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
                    $<CountUp end={order.price} duration={1.5} separator="," />
                  </td>
                  <td className="py-2 px-4">
                    <CountUp end={order.quantity} duration={1} />
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
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-400">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
