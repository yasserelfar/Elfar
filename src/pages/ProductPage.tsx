import React, { useState, useMemo } from "react";
import UserNav from "../components/UserNav";
import ProductCard from "../components/ProductCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Footer from "../components/Footer";

const dummyProducts = [
  {
    id: 1,
    name: "Laptop",
    price: 1200,
    image:
      "https://m.media-amazon.com/images/I/51sWxhvZ5DL._AC_SX300_SY300_QL70_ML2_.jpg",
  },
  {
    id: 2,
    name: "Smartphone",
    price: 800,
    image:
      "https://m.media-amazon.com/images/I/61rK2UbzFTL._AC_SY300_SX300_QL70_ML2_.jpg",
  },
  {
    id: 3,
    name: "Headphones",
    price: 150,
    image:
      "https://m.media-amazon.com/images/I/51oAjwCzv4L._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    id: 4,
    name: "Monitor",
    price: 300,
    image:
      "https://m.media-amazon.com/images/I/71RTruFctrL._AC_SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    id: 5,
    name: "Mouse",
    price: 300,
    image:
      "https://m.media-amazon.com/images/I/71RTruFctrL._AC_SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    id: 6,
    name: "Keyboard",
    price: 100,
    image:
      "https://m.media-amazon.com/images/I/71RTruFctrL._AC_SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    id: 7,
    name: "Tablet",
    price: 400,
    image:
      "https://m.media-amazon.com/images/I/71RTruFctrL._AC_SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    id: 8,
    name: "Monitor",
    price: 300,
    image:
      "https://m.media-amazon.com/images/I/71RTruFctrL._AC_SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    id: 9,
    name: "Speaker",
    price: 150,
    image:
      "https://m.media-amazon.com/images/I/71RTruFctrL._AC_SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    id: 10,
    name: "Camera",
    price: 600,
    image:
      "https://m.media-amazon.com/images/I/71RTruFctrL._AC_SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    id: 11,
    name: "Smartwatch",
    price: 250,
    image:
      "https://m.media-amazon.com/images/I/71RTruFctrL._AC_SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    id: 12,
    name: "Monitor",
    price: 300,
    image:
      "https://m.media-amazon.com/images/I/71RTruFctrL._AC_SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    id: 13,
    name: "Keyboard",
    price: 100,
    image:
      "https://m.media-amazon.com/images/I/71RTruFctrL._AC_SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    id: 14,
    name: "Monitor",
    price: 300,
    image:
      "https://m.media-amazon.com/images/I/71RTruFctrL._AC_SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    id: 15,
    name: "Speaker",
    price: 150,
    image:
      "https://m.media-amazon.com/images/I/71RTruFctrL._AC_SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    id: 16,
    name: "Camera",
    price: 600,
    image:
      "https://m.media-amazon.com/images/I/71RTruFctrL._AC_SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    id: 17,
    name: "Monitor",
    price: 300,
    image:
      "https://m.media-amazon.com/images/I/71RTruFctrL._AC_SY300_SX300_QL70_FMwebp_.jpg",
  },
  {
    id: 18,
    name: "Monitor",
    price: 300,
    image:
      "https://m.media-amazon.com/images/I/71RTruFctrL._AC_SY300_SX300_QL70_FMwebp_.jpg",
  },
];
const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const itemsPerPage = 8;

  // تصفية المنتجات حسب البحث
  const filteredProducts = useMemo(() => {
    return dummyProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  // حساب عدد الصفحات
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // الحصول على المنتجات للصفحة الحالية
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // إعادة تعيين الصفحة عند تغيير البحث
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <UserNav />

      {/* Search Section */}
      <div className="bg-gray-800 py-8 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8  ">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
            جميع المنتجات
          </h1>
          <input
            type="text"
            placeholder="ابحث عن المنتجات..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full px-4 py-3 rounded-lg
             bg-gray-700 text-white placeholder-gray-400 
             focus:outline-none focus:ring-2 focus:ring-blue-500
            
             "
          />
        </div>
      </div>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-8">
        {currentProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronLeftIcon className="w-5 h-5" />
                السابق
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo(0, 0);
                      }}
                      className={`w-10 h-10 rounded-lg font-semibold transition-colors duration-200 ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      {page}
                    </button>
                  ),
                )}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors duration-200"
              >
                التالي
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Page Info */}
            <div className="text-center mt-6 text-gray-400">
              الصفحة {currentPage} من {totalPages} • {filteredProducts.length}{" "}
              منتج
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-400">لا توجد منتجات تطابق بحثك</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ProductPage;
