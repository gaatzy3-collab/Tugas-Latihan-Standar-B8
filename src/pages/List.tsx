import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Card, Popconfirm, Table, message } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import type { BookNote } from '../types/bookNote'
import { useAuthStore } from '../stores/authStore'
import { useBookNotes, useDeleteBookNote } from '../hooks/useBookNotes'

const LIMIT = 5

function List() {
  const logout = useAuthStore((s) => s.logout)
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useBookNotes(page, LIMIT)
  const deleteMutation = useDeleteBookNote()

  const notes = data?.data ?? []
  const meta = data?.meta

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: (res) => {
        message.success(res.message)
        // kalau yang dihapus catatan terakhir di halaman ini, mundur satu halaman
        if (notes.length === 1 && page > 1) setPage(page - 1)
      },
      onError: () => message.error('Gagal menghapus catatan'),
    })
  }

  const columns: ColumnsType<BookNote> = [
    {
      title: 'No',
      key: 'no',
      width: 70,
      render: (_, __, index) => (page - 1) * LIMIT + index + 1,
    },
    { title: 'Judul Buku', dataIndex: 'title', key: 'title' },
    { title: 'Catatan', dataIndex: 'content', key: 'content' },
    {
      title: 'Aksi',
      key: 'aksi',
      render: (_, note) => (
        <div className="flex gap-2">
          <Link to={`/edit/${note.id}`}>
            <Button size="small" type="primary">Edit</Button>
          </Link>
          <Popconfirm
            title="Hapus catatan ini?"
            okText="Ya"
            cancelText="Batal"
            onConfirm={() => handleDelete(note.id)}
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
        title={<span className="text-lg font-semibold">📚 Daftar Catatan Buku</span>}
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
        <Table<BookNote>
          rowKey="id"
          columns={columns}
          dataSource={notes}
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