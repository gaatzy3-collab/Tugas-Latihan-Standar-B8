import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Data palsu
const mockItems = [
  { id: 1, name: 'Belajar React', description: 'Belajar dasar React JS' },
  { id: 2, name: 'Belajar TypeScript', description: 'Belajar TypeScript' },
  { id: 3, name: 'Belajar Node.js', description: 'Belajar backend Node.js' },
  { id: 4, name: 'Belajar Database', description: 'Belajar MySQL & MongoDB' },
  { id: 5, name: 'Belajar API', description: 'Belajar REST API' },
  { id: 6, name: 'Belajar Git', description: 'Belajar Git & GitHub' },
  { id: 7, name: 'Belajar CSS', description: 'Belajar CSS & Styling' },
  { id: 8, name: 'Belajar HTML', description: 'Belajar HTML5' },
];

function List() {
  const navigate = useNavigate();
  const [items, setItems] = useState(mockItems);
  const [page, setPage] = useState(1);
  const perPage = 5;

  const totalPages = Math.ceil(items.length / perPage);
  const startIndex = (page - 1) * perPage;
  const paginatedItems = items.slice(startIndex, startIndex + perPage);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Yakin ingin menghapus?')) {
      setItems(items.filter(item => item.id !== id));
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px', background: 'white', borderRadius: '10px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', paddingBottom: '15px', borderBottom: '2px solid #eee' }}>
        <h1> Daftar Item</h1>
        <div>
          <Link to="/add">
            <button style={{ padding: '10px 20px', background: '#1a73e8', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '10px' }}>+ Tambah</button>
          </Link>
          <button onClick={handleLogout} style={{ padding: '10px 20px', background: '#ea4335', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ padding: '12px', background: '#f8f9fa', borderBottom: '2px solid #ddd', textAlign: 'left' }}>No</th>
            <th style={{ padding: '12px', background: '#f8f9fa', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Nama</th>
            <th style={{ padding: '12px', background: '#f8f9fa', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Deskripsi</th>
            <th style={{ padding: '12px', background: '#f8f9fa', borderBottom: '2px solid #ddd', textAlign: 'left' }}>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {paginatedItems.map((item, index) => (
            <tr key={item.id}>
              <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{(page - 1) * perPage + index + 1}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.name}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>{item.description}</td>
              <td style={{ padding: '12px', borderBottom: '1px solid #eee' }}>
                <Link to={`/edit/${item.id}`}>
                  <button style={{ padding: '6px 12px', background: '#34a853', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginRight: '5px' }}>Edit</button>
                </Link>
                <button onClick={() => handleDelete(item.id)} style={{ padding: '6px 12px', background: '#ea4335', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Hapus</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
          <button onClick={() => setPage(page - 1)} disabled={page === 1} style={{ padding: '8px 16px', border: '1px solid #ddd', background: 'white', borderRadius: '5px', cursor: 'pointer' }}>← Prev</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
            <button key={num} onClick={() => setPage(num)} style={{ padding: '8px 16px', border: '1px solid #ddd', background: page === num ? '#1a73e8' : 'white', color: page === num ? 'white' : 'black', borderRadius: '5px', cursor: 'pointer' }}>{num}</button>
          ))}
          <button onClick={() => setPage(page + 1)} disabled={page === totalPages} style={{ padding: '8px 16px', border: '1px solid #ddd', background: 'white', borderRadius: '5px', cursor: 'pointer' }}>Next →</button>
        </div>
      )}
    </div>
  );
}

export default List;