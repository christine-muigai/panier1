import { Link } from 'react-router-dom';

export default function Home() {
  const categories = ['vegetables', 'fruits', 'cereals', 'dairy','bakery','meat','seafood'];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Browse Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/category/${cat}`}
            className="block bg-white p-6 shadow rounded hover:bg-green-100 text-center font-medium capitalize"
          >
            {cat}
          </Link>
        ))}
      </div>
    </div>
  );
}