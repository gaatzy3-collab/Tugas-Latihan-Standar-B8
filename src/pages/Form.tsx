import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const mockItems = [
  { id: 1, name: 'Belajar React', description: 'Belajar dasar React JS' },
  { id: 2, name: 'Belajar TypeScript', description: 'Belajar TypeScript' },
  { id: 3, name: 'Belajar Node.js', description: 'Belajar backend Node.js' },
];

function Form() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  // ✅ Inisialisasi state langsung dengan data (tanpa useEffect)
  const getInitialData = () => {
    if (isEditMode && id) {
      const item = mockItems.find(i => i.id === Number(id));
      if (item) {
        return { name: item.name, description: item.description };
      }
    }
    return { name: '', description: '' };
  };

  const initialData = getInitialData();
  const [name, setName] = useState(initialData.name);
  const [description, setDescription] = useState(initialData.description);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description) {
      setError('Semua field harus diisi!');
      return;
    }

    alert(isEditMode ? 'Item berhasil diupdate!' : 'Item berhasil ditambahkan!');
    navigate('/');
  };

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
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama"
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Deskripsi</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Masukkan deskripsi"
            style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', minHeight: '100px' }}
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