import React from "react";
import Dashboard from "../components/Dashboard";

import AdminNavbar from "../components/AdminNavbar";

const AdminPage = () => {
  return (
    <>
      <AdminNavbar />
      <h1 className="text-3xl font-bold text-center mt-10">Admin Page</h1>
      <p className="text-center mt-4 text-gray-600">
        Welcome to the admin dashboard. Here you can manage products, orders,
        and users.
      </p>
      <Dashboard />
    </>
  );
};

export default AdminPage;
