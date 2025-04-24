import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from './ProductCard';

function CategoryPage() {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/products?category=${name}`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(error => {
        console.error('Error fetching products:', error);
        setProducts([]);
      });
  }, [name]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold capitalize mb-4 custom-heading">{name}</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">No products found in this category.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
