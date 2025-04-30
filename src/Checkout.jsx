import { useCart } from './CartContext';

export default function Checkout() {
  const { cartItems, clearCart } = useCart();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add some items before placing an order.');
      return;
    }
    alert('Order placed successfully!');
    clearCart();
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-6 text-center">Checkout</h2>

        {cartItems.length > 0 ? (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Your Cart</h3>
            <ul className="divide-y border rounded mb-2">
              {cartItems.map((item, index) => (
                <li key={index} className="py-2 px-3 flex justify-between items-center">
                  <span>{item.name}</span>
                  <span className="text-sm text-gray-700">${item.price}</span>
                </li>
              ))}
            </ul>
            <p className="text-right font-semibold">Total: ${total}</p>
          </div>
        ) : (
          <p className="text-center text-gray-500 mb-6">Your cart is empty.</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input
              type="text"
              placeholder="Shipping Address"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Info</label>
            <input
              type="text"
              placeholder="Credit Card Details"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}
