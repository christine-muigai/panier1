export default function ProductCard({ product }) {
  return (
    <div className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition p-4 bg-white">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-2">${product.price}</p>
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
        Add to Cart
      </button>
    </div>
  );
}

