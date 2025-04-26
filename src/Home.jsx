import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-300 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-800 text-center">
        Welcome to PanierVert
      </h1>
      <p className="text-lg md:text-xl mb-8 text-green-700 text-center">
        Fresh groceries delivered to your door!
      </p>
      <div className="flex space-x-4">
        <Link 
          to="/category/fruits" 
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Fruits
        </Link>
        <Link 
          to="/category/vegetables" 
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Vegetables
        </Link>
        <Link 
          to="/category/cereals" 
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Cereals
        </Link>
        <Link 
          to="/category/dairy" 
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Dairy
        </Link>
      </div>
    </div>
  );
}
