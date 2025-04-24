export default function Checkout() {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
        <h2 className="text-xl font-bold mb-4">Checkout</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full border px-3 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Payment Info"
            className="w-full border px-3 py-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Place Order
          </button>
        </form>
      </div>
    );
  }