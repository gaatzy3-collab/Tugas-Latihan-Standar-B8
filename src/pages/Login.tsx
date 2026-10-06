import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Email dan password harus diisi!');
      return;
    }

    // Simulasi login berhasil
    localStorage.setItem('token', 'token-palsu-12345');
    localStorage.setItem('user', JSON.stringify({ name: 'User', email: email }));
    
    // Langsung pindah halaman
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', background: 'white', borderRadius: '10px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1a73e8' }}>🔐 Login</h2>
      
      {error && <div style={{ background: '#fce8e6', color: '#ea4335', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Masukkan email"
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Masukkan password"
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
        </div>

        <button type="submit" style={{ width: '100%', padding: '12px', background: '#1a73e8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          Login
        </button>
      </form>
      
      <div style={{ marginTop: '20px', padding: '15px', background: '#e6f4ea', borderRadius: '5px', textAlign: 'center', fontSize: '14px', color: '#34a853' }}>
        💡 Email & password bebas!
      </div>
    </div>
  );
}

export default Login;