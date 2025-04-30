import { useState, useEffect } from 'react';
import { 
  handleGoogleLogin, 
  handleEmailLogin, 
  handleEmailSignUp,
  onAuthStateChanged,
  auth
} from '../firebase.js';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectPath = urlParams.get('redirect') || '/';
        window.location.href = redirectPath;
      }
    });

    // Check for logout notification
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('logout')) {
      setSuccess('You have been logged out successfully.');
    }

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await handleEmailLogin(email, password);
      } else {
        await handleEmailSignUp(email, password);
      }
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await handleGoogleLogin();
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Welcome to PanierVert</h1>
        </div>
        <div style={styles.body}>
          {error && (
            <div style={styles.error}>
              {error}
            </div>
          )}
          {success && (
            <div style={styles.success}>
              {success}
            </div>
          )}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
                required
                placeholder="your@email.com"
              />
            </div>
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
                required
                placeholder="••••••••"
              />
            </div>
            <button type="submit" style={styles.button}>
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <button 
            onClick={handleGoogleSignIn}
            style={{ ...styles.button, ...styles.googleButton }}
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              width="18" 
              alt="Google logo" 
              style={{ marginRight: '0.75rem' }}
            />
            Continue with Google
          </button>
        </div>
        <div style={styles.footer}>
          {isLogin ? (
            <>Don't have an account?{' '}
              <span 
                onClick={() => setIsLogin(false)} 
                style={styles.toggle}
              >
                Sign up
              </span>
            </>
          ) : (
            <>Already have an account?{' '}
              <span 
                onClick={() => setIsLogin(true)} 
                style={styles.toggle}
              >
                Sign in
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "'Segoe UI', sans-serif",
    background: '#f8f9fa',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh'
  },
  card: {
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    overflow: 'hidden',
    width: '100%',
    maxWidth: '420px'
  },
  header: {
    background: '#2e7d32',
    color: 'white',
    padding: '1.5rem',
    textAlign: 'center'
  },
  title: {
    margin: 0,
    fontWeight: 600,
    fontSize: '1.5rem'
  },
  body: {
    padding: '2rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.25rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem'
  },
  label: {
    fontWeight: 500,
    color: '#495057'
  },
  input: {
    padding: '0.75rem 1rem',
    border: '1px solid #ced4da',
    borderRadius: '6px',
    fontSize: '1rem',
    transition: 'all 0.2s'
  },
  inputFocus: {
    borderColor: '#2e7d32',
    boxShadow: '0 0 0 3px rgba(46, 125, 50, 0.25)',
    outline: 'none'
  },
  button: {
    background: '#2e7d32',
    color: 'white',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background 0.2s',
    width: '100%'
  },
  googleButton: {
    background: 'white',
    color: '#495057',
    border: '1px solid #ced4da',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '1rem'
  },
  footer: {
    textAlign: 'center',
    padding: '1rem 2rem',
    borderTop: '1px solid #e9ecef',
    color: '#6c757d'
  },
  toggle: {
    color: '#2e7d32',
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'underline'
  },
  error: {
    color: '#dc3545',
    background: '#f8d7da',
    padding: '0.75rem',
    borderRadius: '6px',
    marginBottom: '1rem'
  },
  success: {
    color: '#2e7d32',
    background: '#d4edda',
    padding: '0.75rem',
    borderRadius: '6px',
    marginBottom: '1rem'
  }
};

export default Login;