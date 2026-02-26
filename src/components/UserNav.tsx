import { useState } from "react";
import Logo from "../assets/Logo-removebg.png";
import {
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const UserNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();
  const links = [
    { name: "Home", to: "/" },
    { name: "Products", to: "/productPage" },
    { name: "Contact", to: "#contact", isAnchor: true },
  ];

  return (
    <header className="bg-gray-800 text-white w-full p-4 sticky top-0 z-50">
      <nav className="flex items-center justify-between">
        {/* Left links for large screens */}
        <div className="hidden md:flex gap-8">
          {links.map((link) =>
            link.isAnchor ? (
              <a key={link.name} href={link.to} className="hover:text-gray-300">
                {link.name}
              </a>
            ) : (
              <Link
                key={link.name}
                to={link.to}
                className="hover:text-gray-300"
              >
                {link.name}
              </Link>
            ),
          )}
        </div>

        {/* Logo in center for large screens */}
        <div className="flex-1 flex justify-center md:justify-center">
          <img
            src={Logo}
            alt="Logo"
            className="w-20 md:w-28 lg:w-36 rounded-3xl mx-4"
          />
        </div>

        {/* Right links for large screens */}
        <div className=" md:flex gap-4 items-center mx-4 hidden">
          <span className="text-sm">
            Welcome,{" "}
            <span className="font-semibold">{user?.name || "User"}</span>
          </span>{" "}
          <div className="hidden flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full md:flex hover:bg-gray-300 hover:scale-105 transition-transform duration-200 cursor-pointer">
            <UserCircleIcon className="w-8 h-8 text-gray-600" />
          </div>
        </div>

        {/* Hamburger for mobile */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <XMarkIcon className="w-8 h-8 text-white" />
            ) : (
              <Bars3Icon className="w-8 h-8 text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mt-2 flex flex-col gap-4 bg-gray-700 p-4 rounded-md transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {/* Account */}
        
        <a href="#" className="hover:text-gray-300 text-center">
          Account
        </a>

        {/* Links */}
        {links.map((link) =>
          link.isAnchor ? (
            <a
              key={link.name}
              href={link.to}
              className="hover:text-gray-300 text-center"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ) : (
            <Link
              key={link.name}
              to={link.to}
              className="hover:text-gray-300 text-center"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ),
        )}
      </div>
    </header>
  );
};

export default UserNav;
