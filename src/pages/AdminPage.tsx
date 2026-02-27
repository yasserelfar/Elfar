import Dashboard from "../components/Dashboard";

import AdminNavbar from "../components/AdminNavbar";

const AdminPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen px-4 sm:px-10">
      <AdminNavbar className="w-full" />
      <h1 className="text-2xl sm:text-3xl font-bold text-center mt-10 text-white">
        Admin Page
      </h1>
      <p className="text-center mt-4 text-gray-300">
        Welcome to the admin dashboard. Here you can manage products, orders,
        and users.
      </p>
      <Dashboard />
    </div>
  );
};

export default AdminPage;
