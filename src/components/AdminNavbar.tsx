import React from "react";
import { Link, useLocation } from "react-router-dom";

const AdminNavbar = ({ className }) => {
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/" },
    { name: "Products", path: "/Adminproducts" },
    { name: "Orders", path: "/orders" },
  ];

  return (
    <nav className={`${className} bg-gray-800 shadow-md p-4 flex justify-between items-center`}>
      <div className="text-2xl font-bold ">Elfar Group</div>

      <div className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.name}
            to={link.path}
            className={`px-3 py-2 rounded font-medium ${
              location.pathname === link.path
                ? "bg-blue-500 text-white"
                : "text-gray-700 hover:bg-gray-200"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default AdminNavbar;
