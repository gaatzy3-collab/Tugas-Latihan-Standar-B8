// Import library utama React untuk membangun antarmuka (UI)
import React from 'react';

// Import ReactDOM untuk merender (menampilkan) komponen React ke dalam elemen HTML di browser
import ReactDOM from 'react-dom/client';

// Import BrowserRouter dari react-router-dom untuk mengatur navigasi/pindah antar halaman
import { BrowserRouter } from 'react-router-dom';

// Import komponen utama aplikasi (App) yang berisi seluruh struktur halaman
import App from './App';

// Import file CSS global agar styling-nya berlaku untuk seluruh aplikasi
import './index.css';

// Mencari elemen HTML dengan id="root" di file index.html, 
// lalu membuat "akar" (root) React di dalamnya untuk mulai merender aplikasi.
// (Tanda '!' di belakangnya adalah TypeScript assertion untuk memastikan elemen root pasti ada)
ReactDOM.createRoot(document.getElementById('root')!).render(
  
  // StrictMode: Mode khusus untuk development yang membantu mendeteksi bug atau masalah pada komponen.
  // (Tidak akan memberikan efek apa pun saat aplikasi sudah di-deploy ke production)
    // BrowserRouter: Membungkus seluruh aplikasi agar fitur routing (URL dan navigasi) bisa berfungsi

  <React.StrictMode>
    
    <BrowserRouter>
      
      {/* Merender komponen utama 'App' yang akan tampil di layar */}
      <App />
      
    </BrowserRouter>
    
  </React.StrictMode>,
);