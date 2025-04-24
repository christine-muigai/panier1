import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';

export default function CategoryPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/${category}`)
      .then((res) => res.json())
      .then(setProducts);
  }, [category]);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold capitalize mb-6">{category}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}