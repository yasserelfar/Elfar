import { useState, useMemo, useEffect } from "react";
import AdminNavbar from "../components/AdminNavbar";
import CountUp from "react-countup";
import * as orderService from "../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState<orderService.Order[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getOrderId = (order: orderService.Order) => order._id || order.id || "";

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await orderService.getAllOrders();
        setOrders(data);
      } catch (e: any) {
        setError(e.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  // فلترة البيانات

  // show loading / error states
  if (loading) {
    return (
      <div className="bg-gray-900 min-h-screen px-4 sm:px-10">
        <AdminNavbar className="w-full" />
        <p className="text-center text-white mt-10">Loading orders...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-gray-900 min-h-screen px-4 sm:px-10">
        <AdminNavbar className="w-full" />
        <p className="text-center text-red-500 mt-10">{error}</p>
      </div>
    );
  }
  const filteredOrders = useMemo(() => {
    if (!orders || !Array.isArray(orders)) return [];
    return orders.filter((order) => {
      const matchesSearch =
        order.items.some((item) =>
          item.product.name.toLowerCase().includes(search.toLowerCase()),
        ) || order.shippingAddress.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  const getStatusColor = (status: string) => {
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
    <div className="bg-gray-900 min-h-screen px-4 sm:px-10">
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
              <th className="py-2 px-4 text-left">Order ID</th>
              <th className="py-2 px-4 text-left">Items</th>
              <th className="py-2 px-4 text-left">Total</th>
              <th className="py-2 px-4 text-left">Shipping Address</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr
                  key={getOrderId(order)}
                  className="border-t border-gray-700 text-white"
                >
                  <td className="py-2 px-4">
                    {(order._id || order.id || "").slice(-8) || "N/A"}
                  </td>
                  <td className="py-2 px-4">
                    {order.items.length} item
                    {order.items.length !== 1 ? "s" : ""} -{" "}
                    {order.items[0].product.name}
                    {order.items.length > 1 ? "..." : ""}
                  </td>
                  <td className="py-2 px-4">
                    $<CountUp end={order.total} duration={1.5} separator="," />
                  </td>
                  <td className="py-2 px-4">{order.shippingAddress}</td>
                  <td className="py-2 px-4">
                    <select
                      value={order.status}
                      onChange={async (e) => {
                        const newStatus = e.target
                          .value as orderService.Order["status"];
                        try {
                          await orderService.updateOrderStatus(
                            getOrderId(order),
                            { status: newStatus },
                          );
                          // Update local state
                          setOrders((prev) =>
                            prev.map((o) =>
                              getOrderId(o) === getOrderId(order)
                                ? { ...o, status: newStatus }
                                : o,
                            ),
                          );
                        } catch (error) {
                          console.error(
                            "Failed to update order status:",
                            error,
                          );
                        }
                      }}
                      className={`px-2 py-1 rounded text-sm ${getStatusColor(order.status)}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-2 px-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 px-4 text-center text-gray-400">
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
