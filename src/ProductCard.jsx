import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden p-4 flex flex-col justify-between">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h3 className="font-semibold text-lg">{product.name}</h3>
      <p className="text-gray-600 text-sm mt-1 mb-2 capitalize">{product.category}</p>
      <div className="font-bold text-green-700 mb-4">${product.price.toFixed(2)}</div>
      <button
        onClick={() => navigate('/checkout')}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Buy Now
      </button>
    </div>
  );
}
