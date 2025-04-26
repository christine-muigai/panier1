import { Link } from 'react-router-dom';

export default function Home() {
  const categories = ['vegetables', 'fruits', 'cereals', 'dairy','bakery','meat','seafood'];
}

  export default function Home() {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Panier Vert</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/category/${category}`}
              className="border p-6 rounded-lg text-center shadow hover:shadow-lg bg-white capitalize"
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    );
  } 