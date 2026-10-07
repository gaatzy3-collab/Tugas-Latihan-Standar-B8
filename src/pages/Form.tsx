// Import hook yang dibutuhkan: useState (state), useEffect (side-effect), useNavigate & useParams (routing)
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// ✅ 1. DEFINISI TIPE DATA (TYPESCRIPT)
// Interface ini bertindak sebagai "kontrak" atau "cetakan". 
// Memastikan setiap object Item WAJIB punya id (number), name (string), dan description (string).
interface Item {
  id: number;
  name: string;
  description: string;
}

// Data default sebagai fallback jika localStorage masih kosong (pertama kali buka aplikasi)
const defaultItems: Item[] = [
  { id: 1, name: 'Belajar React', description: 'Belajar dasar React JS' },
  { id: 2, name: 'Belajar TypeScript', description: 'Belajar TypeScript' },
  { id: 3, name: 'Belajar Node.js', description: 'Belajar backend Node.js' },
  { id: 4, name: 'Belajar Database', description: 'Belajar MySQL & MongoDB' },
  { id: 5, name: 'Belajar API', description: 'Belajar REST API' },
  { id: 6, name: 'Belajar Git', description: 'Belajar Git & GitHub' },
  { id: 7, name: 'Belajar CSS', description: 'Belajar CSS & Styling' },
  { id: 8, name: 'Belajar HTML', description: 'Belajar HTML5' },
];

function Form() {
  // ✅ 2. INISIALISASI HOOKS
  const navigate = useNavigate();
  const { id } = useParams(); // Mengambil parameter ID dari URL (misal: "/edit/2" -> id = "2")
  const isEditMode = !!id; // Mengubah id menjadi boolean (true jika ada id, false jika tidak)

  // State untuk form input
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // ✅ 3. EFEK UNTUK MENGISI FORM (KHUSUS MODE EDIT)
  // useEffect ini berjalan saat komponen pertama kali dimuat (mount) atau saat 'id' berubah.
  useEffect(() => {
    if (isEditMode && id) {
      // 1. Ambil data dari localStorage. Jika tidak ada, gunakan defaultItems.
      const saved = localStorage.getItem('appItems');
      const items: Item[] = saved ? JSON.parse(saved) : defaultItems;
      
      // 2. Cari item yang ID-nya cocok dengan parameter URL (ubah string 'id' jadi Number)
      const item = items.find(i => i.id === Number(id));
      
      // 3. Jika ketemu, isi state form dengan data lama tersebut (Pre-fill)
      if (item) {
        setName(item.name);
        setDescription(item.description);
      }
    }
  }, [id, isEditMode]); // Dependency array: jalankan ulang jika id atau isEditMode berubah

  // ✅ 4. FUNGSI HANDLE SUBMIT (SIMPAN DATA)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman
    
    // Validasi
    if (!name || !description) {
      setError('Semua field harus diisi!');
      return;
    }

    // Ambil data terbaru dari localStorage (atau default)
    const saved = localStorage.getItem('appItems');
    let items: Item[] = saved ? JSON.parse(saved) : defaultItems;

    if (isEditMode) {
      // --- LOGIKA UPDATE (EDIT) ---
      // Gunakan .map() untuk membuat array BARU. 
      // Jika ID cocok, buat object baru dengan data lama (...item) yang ditimpa oleh name & description baru.
      // Jika ID tidak cocok, kembalikan object item apa adanya.
      items = items.map(item => 
        item.id === Number(id) ? { ...item, name, description } : item
      );
      alert('Item berhasil diupdate!');
      
    } else {
      // --- LOGIKA TAMBAH (CREATE) ---
      // Cari ID terbesar yang ada, lalu tambahkan 1 untuk ID baru.
      // (Jika array kosong, mulai dari 1)
      const newId = items.length > 0 ? Math.max(...items.map(i => i.id)) + 1 : 1;
      
      // Tambahkan item baru ke dalam array
      items.push({ id: newId, name, description });
      alert('Item berhasil ditambahkan!');
    }

    // ✅ 5. SIMPAN KE LOCALSTORAGE & REDIRECT
    // Ubah array JavaScript kembali menjadi string JSON agar bisa disimpan di localStorage
    localStorage.setItem('appItems', JSON.stringify(items));
    
    // Kembali ke halaman daftar
    navigate('/');
  };

  // ✅ 6. TAMPILAN UI (JSX)
  // (Sama seperti sebelumnya, teks judul dan tombol berubah dinamis berdasarkan isEditMode)
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '30px', background: 'white', borderRadius: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '2px solid #eee' }}>
        <h1>{isEditMode ? '✏️ Edit Item' : '➕ Tambah Item'}</h1>
        <button onClick={() => navigate('/')} style={{ padding: '10px 20px', background: '#5f6368', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>← Kembali</button>
      </div>

      {error && <div style={{ background: '#fce8e6', color: '#ea4335', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Nama</label>
          <input
            type="text"
            value={name}
            onChange={(e) => { setName(e.target.value); setError(''); }}
            placeholder="Masukkan nama"
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => { setDescription(e.target.value); setError(''); }}
            placeholder="Masukkan deskripsi"
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', minHeight: '100px', boxSizing: 'border-box' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" style={{ padding: '10px 20px', background: '#1a73e8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            {isEditMode ? 'Update' : 'Tambah'}
          </button>
          <button type="button" onClick={() => navigate('/')} style={{ padding: '10px 20px', background: '#5f6368', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Batal</button>
        </div>
      </form>
    </div>
  );
}

export default Form;