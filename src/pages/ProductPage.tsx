import { useState, useMemo, useEffect } from "react";
import UserNav from "../components/UserNav";
import ProductCard from "../components/ProductCard";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Footer from "../components/Footer";
import * as productService from "../services/productService";

// dummyProducts moved to service

const ProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<productService.Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const itemsPerPage = 8;

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const res = await productService.fetchProducts();
        setProducts(res);
      } catch (e: any) {
        setError(e.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // تصفية المنتجات حسب البحث
  const filteredProducts = useMemo(() => {
    return products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm, products]);

  // حساب عدد الصفحات
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // الحصول على المنتجات للصفحة الحالية
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // إعادة تعيين الصفحة عند تغيير البحث
  const handleSearch = (value: string) => {
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

      {loading && (
        <p className="text-center text-white mt-4">Loading products...</p>
      )}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}

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
