import React from 'react';
import ReactDOM from 'react-dom/client';
import { auth, onAuthStateChanged, handleLogout } from '../firebase.js';
import Login from './login.jsx';
import App from './App.jsx';
import { CartProvider } from './CartContext';
import './index.css';

const Root = () => {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      window.location.href = '/login?logout=true';
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <>
      <button className="logout-btn" onClick={handleLogoutClick}>
        Logout
      </button>
      <App />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
)