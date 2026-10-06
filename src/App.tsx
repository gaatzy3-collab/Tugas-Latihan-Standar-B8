import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import List from './pages/List';
import Form from './pages/Form';

function App() {
  // ✅ Gunakan state untuk tracking token
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  // ✅ Cek token setiap kali ada perubahan
  useEffect(() => {
    const checkToken = () => {
      const currentToken = localStorage.getItem('token');
      setToken(currentToken);
    };

    // Cek token saat komponen mount
    checkToken();

    // Listen perubahan storage (untuk sync antar tab)
    window.addEventListener('storage', checkToken);
    
    // Cek token setiap 100ms (untuk catch perubahan di tab yang sama)
    const interval = setInterval(checkToken, 100);

    return () => {
      window.removeEventListener('storage', checkToken);
      clearInterval(interval);
    };
  }, []);

  return (
    <Routes>
      <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/" element={token ? <List /> : <Navigate to="/login" replace />} />
      <Route path="/add" element={token ? <Form /> : <Navigate to="/login" replace />} />
      <Route path="/edit/:id" element={token ? <Form /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;