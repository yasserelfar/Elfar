import { useState, useEffect } from "react";
import UserNav from "../components/UserNav";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import * as productService from "../services/productService";

const Home = () => {
  const [featured, setFeatured] = useState<productService.Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const all = await productService.fetchProducts();
        // just take first 4 as featured
        setFeatured(all.slice(0, 4));
      } catch (e: any) {
        setError(e.message || "Could not load featured");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900">
      <UserNav />
      <Hero />
      {loading && <p className="text-center text-white mt-4">Loading...</p>}
      {error && <p className="text-center text-red-500 mt-4">{error}</p>}
      <section className="py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-white shadow-lg">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
