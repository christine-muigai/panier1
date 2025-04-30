import React from 'react';
import App from './App.jsx';
import { CartProvider } from './CartContext';
import './index.css';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
);