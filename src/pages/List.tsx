import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Card, Popconfirm, Table, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { Item } from '../types/item'
import { defaultItems } from '../data/defaultItems'

const PER_PAGE = 5

function List() {
  const navigate = useNavigate()

  const [items, setItems] = useState<Item[]>(() => {
    try {
      const saved = localStorage.getItem('appItems')
      return saved ? (JSON.parse(saved) as Item[]) : defaultItems
    } catch {
      return defaultItems
    }
  })
  const [page, setPage] = useState(1)

  const saveItems = (newItems: Item[]) => {
    setItems(newItems)
    localStorage.setItem('appItems', JSON.stringify(newItems))
  }

  const handleLogout = () => {
    localStorage.removeItem('token') // akan diganti Zustand di Tahap 3
    navigate('/login')
  }

  const handleDelete = (id: number) => {
    saveItems(items.filter((item) => item.id !== id))
    message.success('Item berhasil dihapus')
  }

  const columns: ColumnsType<Item> = [
    {
      title: 'No',
      key: 'no',
      width: 70,
      render: (_, __, index) => (page - 1) * PER_PAGE + index + 1,
    },
    { title: 'Nama', dataIndex: 'name', key: 'name' },
    { title: 'Deskripsi', dataIndex: 'description', key: 'description' },
    {
      title: 'Aksi',
      key: 'aksi',
      render: (_, item) => (
        <div className="flex gap-2">
          <Link to={`/edit/${item.id}`}>
            <Button size="small" type="primary">Edit</Button>
          </Link>
          <Popconfirm
            title="Hapus item ini?"
            okText="Ya"
            cancelText="Batal"
            onConfirm={() => handleDelete(item.id)}
          >
            <Button size="small" danger>Hapus</Button>
          </Popconfirm>
        </div>
      ),
    },
  ]

  return (
    <div className="mx-auto max-w-4xl p-4">
      <Card
        title={<span className="text-lg font-semibold">📋 Daftar Item</span>}
        extra={
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link to="/add">
              <Button type="primary">+ Tambah</Button>
            </Link>
            <Button danger onClick={handleLogout}>Logout</Button>
          </div>
        }
      >
        <Table<Item>
          rowKey="id"
          columns={columns}
          dataSource={items}
          scroll={{ x: 'max-content' }}
          pagination={{
            current: page,
            pageSize: PER_PAGE,
            onChange: setPage,
            showSizeChanger: false,
          }}
        />
      </Card>
    </div>
  )
}

export default List