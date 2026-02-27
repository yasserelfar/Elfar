import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";

const AdminNavbar = ({ className }: { className?: string }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const { logout } = useAuth();
  const links = [
    { name: "Dashboard", path: "/admin" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
    { name: "Logout", path: "/login", onClick: () => handleLogout() },
    { name: "Account", path: "/account" },
  ];
  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };
  return (
    <nav
      className={`${className ? className : ""}   p-4 flex flex-wrap justify-between items-center`}
    >
      <div className="text-2xl font-bold text-white">Elfar Group</div>
      {/* mobile menu toggle button */}
      <button
        className="text-white md:hidden"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label="Toggle navigation"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>
      <div
        className={`${mobileOpen ? "block" : "hidden"} w-full md:flex md:w-auto md:items-center md:justify-end`}
      >
        <div className="flex flex-col md:flex-row md:gap-6">
          {links.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-3 py-2 rounded font-medium ${
                location.pathname === link.path
                  ? "bg-blue-500 text-white"
                  : "text-gray-200 hover:bg-gray-700"
              }`}
              onClick={() => {
                if (link.onClick) {
                  link.onClick();
                }
                setMobileOpen(false);
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
