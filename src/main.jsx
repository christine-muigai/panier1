import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './CartContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); 

root.render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>
);
