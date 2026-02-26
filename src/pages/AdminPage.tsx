import React from "react";
import Dashboard from "../components/Dashboard";

import AdminNavbar from "../components/AdminNavbar";

const AdminPage = () => {
  return (
    <div className="bg-gray-900 min-h-screen">
      <AdminNavbar />
      <h1 className="text-3xl font-bold text-center mt-10  ">Admin Page</h1>
      <p className="text-center mt-4 ">
        Welcome to the admin dashboard. Here you can manage products, orders,
        and users.
      </p>
      <Dashboard />
    </div>
  );
};

export default AdminPage;
