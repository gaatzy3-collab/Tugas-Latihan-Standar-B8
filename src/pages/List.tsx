import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Card, Popconfirm, Table, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { Item } from '../types/item'
import { useAuthStore } from '../stores/authStore'
import { useDeleteItem, useItems } from '../hooks/useItems'

const LIMIT = 5

function List() {
  const logout = useAuthStore((s) => s.logout)
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useItems(page, LIMIT)
  const deleteMutation = useDeleteItem()

  const items = data?.data ?? []
  const meta = data?.meta

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: (res) => {
        message.success(res.message)
        // kalau yang dihapus item terakhir di halaman ini, mundur satu halaman
        if (items.length === 1 && page > 1) setPage(page - 1)
      },
      onError: () => message.error('Gagal menghapus item'),
    })
  }

  const columns: ColumnsType<Item> = [
    {
      title: 'No',
      key: 'no',
      width: 70,
      render: (_, __, index) => (page - 1) * LIMIT + index + 1,
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
            <Button size="small" danger loading={deleteMutation.isPending}>
              Hapus
            </Button>
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
            <Button danger onClick={logout}>Logout</Button>
          </div>
        }
      >
        {isError && (
          <div className="mb-4">
            <Alert type="error" message="Gagal memuat data" showIcon />
          </div>
        )}
        <Table<Item>
          rowKey="id"
          columns={columns}
          dataSource={items}
          loading={isLoading}
          scroll={{ x: 'max-content' }}
          pagination={{
            current: page,
            pageSize: LIMIT,
            total: meta?.totalData ?? 0,
            onChange: setPage,
            showSizeChanger: false,
          }}
        />
      </Card>
    </div>
  )
}

export default List