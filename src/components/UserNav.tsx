import { useState } from "react";
import Logo from "../assets/Logo-removebg.png";
import {
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/solid";

const UserNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-800 text-white w-full p-4">
      <nav className="flex items-center justify-between">
        {/* Left links for large screens */}
        <div className="hidden md:flex gap-8">
          <a href="#" className="hover:text-gray-300">
            Home
          </a>
          <a href="#" className="hover:text-gray-300">
            Products
          </a>
          <a href="#" className="hover:text-gray-300">
            Contact
          </a>
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
        <div className="hidden md:flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search: نجف , مفاتيح"
            className="px-2 py-1 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full hover:bg-gray-300 hover:scale-105 transition-transform duration-200 cursor-pointer">
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
        {/* Search */}
        <input
          type="text"
          placeholder="Search..."
          className="px-2 py-1 rounded-md bg-gray-600 text-center text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Account */}
        <a href="#" className="hover:text-gray-300 text-center">
          Account
        </a>

        {/* Links */}
        <a href="#" className="hover:text-gray-300 text-center">
          Home
        </a>
        <a href="#" className="hover:text-gray-300 text-center">
          Products
        </a>
        <a href="#" className="hover:text-gray-300 text-center">
          Contact
        </a>
      </div>
    </header>
  );
};

export default UserNav;
