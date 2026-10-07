// Import hook useState dan useEffect dari React untuk mengelola state dan side-effect
import { useState, useEffect } from 'react';

// Import komponen routing dari react-router-dom untuk mengatur halaman dan pengalihan (redirect)
import { Routes, Route, Navigate } from 'react-router-dom';

// Import komponen halaman (pages) yang akan ditampilkan
import Login from './pages/Login';
import List from './pages/List';
import Form from './pages/Form';

function App() {
  // ✅ 1. STATE TOKEN
  // Membuat state 'token' untuk menyimpan status login user.
  // Nilai awalnya diambil langsung dari localStorage agar tidak null saat pertama kali dimuat.
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  // ✅ 2. EFEK PEMANTAUAN (WATCHER) TOKEN
  // useEffect ini memastikan state 'token' di React SELALU sinkron dengan isi localStorage.
  useEffect(() => {
    
    // Fungsi untuk membaca ulang token dari localStorage dan mengupdate state
    const checkToken = () => {
      const currentToken = localStorage.getItem('token');
      setToken(currentToken);
    };

    // Jalankan sekali saat komponen pertama kali muncul (mount)
    checkToken();

    // Dengarkan event 'storage' (berfungsi jika token berubah di TAB browser yang BERBEDA)
    window.addEventListener('storage', checkToken);
    
    // Jalankan pengecekan setiap 100ms (berfungsi jika token berubah di TAB browser yang SAMA)
    const interval = setInterval(checkToken, 100);

    // ✅ CLEANUP FUNCTION
    // Dibutuhkan agar saat komponen App dihancurkan, listener dan interval dimatikan 
    // untuk mencegah kebocoran memori (memory leak) di browser.
    return () => {
      window.removeEventListener('storage', checkToken);
      clearInterval(interval);
    };
  }, []); // Array kosong [] memastikan efek ini hanya disetup sekali saat awal

  // ✅ 3. KONFIGURASI ROUTING & PROTEKSI HALAMAN (ROUTE GUARD)
  return (
    <Routes>
      {/* 
        HALAMAN LOGIN (/login)
        - Jika token ADA (sudah login): Paksa pindah (redirect) ke halaman utama "/"
        - Jika token TIDAK ADA (belum login): Tampilkan halaman <Login />
        - 'replace' artinya mengganti history browser, jadi user tidak bisa klik tombol "Back" untuk kembali ke halaman yang dilarang.
      */}
      <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
      
      {/* 
        HALAMAN UTAMA / LIST (/)
        - Jika token ADA: Tampilkan halaman <List />
        - Jika token TIDAK ADA: Paksa pindah ke halaman "/login"
      */}
      <Route path="/" element={token ? <List /> : <Navigate to="/login" replace />} />
      
      {/* 
        HALAMAN TAMBAH DATA (/add)
        - Jika token ADA: Tampilkan halaman <Form /> (untuk input data baru)
        - Jika token TIDAK ADA: Paksa pindah ke halaman "/login"
      */}
      <Route path="/add" element={token ? <Form /> : <Navigate to="/login" replace />} />
      
      {/* 
        HALAMAN EDIT DATA (/edit/:id)
        - ":id" adalah parameter dinamis (contoh: /edit/123)
        - Jika token ADA: Tampilkan halaman <Form /> (biasanya komponen Form ini punya logika internal untuk mode "edit")
        - Jika token TIDAK ADA: Paksa pindah ke halaman "/login"
      */}
      <Route path="/edit/:id" element={token ? <Form /> : <Navigate to="/login" replace />} />
    </Routes>
  );
}

// Export komponen App agar bisa digunakan (di-import) di file main.tsx / index.tsx
export default App;