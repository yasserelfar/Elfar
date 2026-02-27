import { FaFacebookF, FaPhoneAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10" id="contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-6">
        {/* Logo / Name */}
        <div className="text-white font-bold text-lg">Elfar Group</div>

        {/* Contact Info */}
        <div className="flex flex-col items-center sm:items-end gap-2">
          {/* Phone */}
          <div className="flex items-center gap-2">
            <FaPhoneAlt className="text-blue-400" />
            <span>+20 1001370454</span>
          </div>

          {/* Facebook */}
          <div>
            <a
              href="https://www.facebook.com/profile.php?id=61554691803492"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-blue-500 transition"
            >
              <FaFacebookF /> Facebook
            </a>
          </div>

          {/* Copyright */}
          <div className="text-sm text-gray-400 mt-2">
            &copy; {new Date().getFullYear()} My Store. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
