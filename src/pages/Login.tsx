// Import hook useState untuk mengelola data yang berubah (input form & error)
import { useState } from 'react';

// Import hook useNavigate untuk mengarahkan user ke halaman lain secara programatik
import { useNavigate } from 'react-router-dom';

function Login() {
  // ✅ 1. INISIALISASI HOOKS
  // useNavigate digunakan untuk redirect/pindah halaman setelah login berhasil
  const navigate = useNavigate();
  
  // State untuk menyimpan nilai input dari user
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // State untuk menyimpan pesan error jika validasi gagal
  const [error, setError] = useState('');

  // ✅ 2. FUNGSI HANDLE SUBMIT (Dijalankan saat form dikirim)
  const handleSubmit = (e: React.FormEvent) => {
    // Mencegah perilaku default browser (yang akan me-refresh halaman saat form di-submit)
    e.preventDefault();
    
    // Validasi sederhana: Pastikan email dan password tidak kosong
    if (!email || !password) {
      setError('Email dan password harus diisi!'); // Tampilkan pesan error
      return; // Hentikan eksekusi fungsi, jangan lanjut ke proses login
    }

    // ✅ 3. SIMULASI PROSES LOGIN BERHASIL
    // Karena ini simulasi, kita langsung simpan data ke localStorage.
    // (Penyimpanan di localStorage inilah yang akan DIDETEKSI oleh useEffect di App.tsx tadi!)
    localStorage.setItem('token', 'token-palsu-12345');
    localStorage.setItem('user', JSON.stringify({ name: 'User', email: email }));
    
    // ✅ 4. REDIRECT / PINDAH HALAMAN
    // Arahkan user ke halaman utama ('/') setelah token berhasil disimpan
    navigate('/');
  };

  // ✅ 5. TAMPILAN UI (JSX)
  return (
    // Container utama dengan styling inline agar rapi di tengah layar
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '30px', background: 'white', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#1a73e8' }}>🔐 Login</h2>
      
      {/* Conditional Rendering: Tampilkan kotak error HANYA jika state 'error' tidak kosong */}
      {error && (
        <div style={{ background: '#fce8e6', color: '#ea4335', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
          {error}
        </div>
      )}
      
      {/* Form dengan event onSubmit yang terhubung ke fungsi handleSubmit */}
      <form onSubmit={handleSubmit}>
        
        {/* Input Email */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input
            type="email"
            value={email} // Two-way data binding: Nilai input mengikuti state 'email'
            onChange={(e) => {
              setEmail(e.target.value); // Update state setiap kali user mengetik
              setError(''); // Hapus pesan error saat user mulai mengetik ulang
            }}
            placeholder="Masukkan email"
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }}
          />
        </div>

        {/* Input Password */}
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password</label>
          <input
            type="password"
            value={password} // Two-way data binding: Nilai input mengikuti state 'password'
            onChange={(e) => {
              setPassword(e.target.value); // Update state setiap kali user mengetik
              setError(''); // Hapus pesan error saat user mulai mengetik ulang
            }}
            placeholder="Masukkan password"
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }}
          />
        </div>

        {/* Tombol Submit */}
        <button 
          type="submit" 
          style={{ width: '100%', padding: '12px', background: '#1a73e8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold' }}
        >
          Login
        </button>
      </form>
      
      {/* Kotak informasi tambahan */}
      <div style={{ marginTop: '20px', padding: '15px', background: '#e6f4ea', borderRadius: '5px', textAlign: 'center', fontSize: '14px', color: '#34a853' }}>
        💡 Email & password bebas! (Ini hanya simulasi)
      </div>
    </div>
  );
}

// Export komponen agar bisa di-import di file App.tsx
export default Login;