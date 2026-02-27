import UserNav from "../components/UserNav";
import Cart from "../components/Cart";
import Footer from "../components/Footer";

const CartPage = () => {
  return (
    <div className="bg-gray-900">
      <UserNav />
      <h1 className="text-3xl font-bold  text-center mt-8 text-white">
        Cart Page
      </h1>
      <p className="text-center text-gray-400 mt-4">
        Your cart items will appear here.
      </p>
      <Cart />
      <Footer />
    </div>
  );
};

export default CartPage;
