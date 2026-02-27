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

  // Declare all hooks at the top, before any conditional returns
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

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await orderService.fetchOrders();
        setOrders(data);
      } catch (e: unknown) {
        const errorMsg =
          e instanceof Error ? e.message : "Failed to load orders";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

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

  // Now render based on state, without early returns
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
                    <select
                      value={order.status}
                      onChange={async (e) => {
                        const newStatus = e.target.value;
                        try {
                          const updated = await orderService.updateOrderStatus(
                            order.id,
                            newStatus,
                          );
                          setOrders((prev) =>
                            prev.map((o) =>
                              o.id === updated.id ? updated : o,
                            ),
                          );
                        } catch (err) {
                          console.error(err);
                        }
                      }}
                      className={`px-2 py-1 rounded text-sm font-semibold ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-400">
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
