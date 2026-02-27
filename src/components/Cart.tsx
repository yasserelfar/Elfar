import { useCart, useAuth } from "../hooks";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice: calcTotal,
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const decreaseQuantity = async (id: number) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    await updateQuantity(id, item.quantity - 1);
  };

  const removeItem = async (id: number) => {
    await removeFromCart(id);
  };

  const totalPrice = calcTotal();

  const handleCheckout = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    alert("Order Placed Successfully 🎉");
    clearCart();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p className="text-gray-400">Your cart is empty</p>
      ) : (
        <>
          <div className="space-y-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-gray-800 p-4 rounded-lg flex items-center justify-between"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p className="text-blue-400">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    className="bg-gray-700 px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={async () => {
                      await addToCart(item);
                    }}
                    className="bg-gray-700 px-3 py-1 rounded"
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem(item.id)}
                    className="bg-red-600 px-3 py-1 rounded ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Total + Checkout */}
          <div className="mt-10 bg-gray-800 p-6 rounded-lg flex justify-between items-center">
            <h2 className="text-xl font-bold">
              Total: <span className="text-green-400">${totalPrice}</span>
            </h2>

            <button
              onClick={handleCheckout}
              className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-semibold"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
