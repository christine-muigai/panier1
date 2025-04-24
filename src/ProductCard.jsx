import { useNavigate } from 'react-router-dom';

export default function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="border p-4 rounded-lg shadow-sm">
      <h3 className="font-semibold text-lg">{product.title}</h3>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <div className="font-bold mb-4">${product.price}</div>
      <button
        onClick={() => navigate('/checkout')}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Buy Now
      </button>
    </div>
  );
}