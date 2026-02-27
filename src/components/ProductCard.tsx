import { useContext } from "react";
import { CartContext } from "../context/CartContext";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("ProductCard must be used within CartProvider");
  }
  const { addToCart } = context;
  return (
    <div
      key={product.id}
      className="rounded-xl shadow-lg p-4 hover:scale-105 transition
        duration-200 bg-gray-800 text-white hover:shadow-lg
      
      hover:shadow-amber-50"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded mb-4 "
      />

      <h3 className="font-semibold mb-2">{product.name}</h3>
      <p className="text-blue-400 font-bold mb-4">${product.price}</p>

      <button
        onClick={() => addToCart(product)}
        className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
