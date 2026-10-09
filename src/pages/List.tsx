import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Button, Card, message } from 'antd'
import { DataGrid, type GridColDef } from '@mui/x-data-grid'
import type { BookNote } from '../types/bookNote'
import { useAuthStore } from '../stores/authStore'
import { useBookNotes, useDeleteBookNote } from '../hooks/useBookNotes'
import { getErrorMessage } from '../lib/errorMessage'
import BookNoteActions from '../components/BookNoteActions'

const LIMIT = 5

interface BookNoteRow extends BookNote {
  no: number
}

function List() {
  const logout = useAuthStore((s) => s.logout)
  const [page, setPage] = useState(1)

  const { data, isLoading, isError, error } = useBookNotes(page, LIMIT)
  const { mutate: deleteNote, isPending: isDeleting } = useDeleteBookNote()

  const notes = useMemo(() => data?.data ?? [], [data])
  const meta = data?.meta
  const notesCount = notes.length

  const rows = useMemo<BookNoteRow[]>(
    () => notes.map((note, index) => ({ ...note, no: (page - 1) * LIMIT + index + 1 })),
    [notes, page],
  )

  const handleDelete = useCallback(
    (id: number) => {
      deleteNote(id, {
        onSuccess: (res) => {
          message.success(res.message)
          // kalau yang dihapus catatan terakhir di halaman ini, mundur satu halaman
          if (notesCount === 1 && page > 1) setPage(page - 1)
        },
        onError: (err) => message.error(getErrorMessage(err)),
      })
    },
    [deleteNote, notesCount, page],
  )

  const columns = useMemo<GridColDef<BookNoteRow>[]>(
    () => [
      { field: 'no', headerName: 'No', width: 70, sortable: false },
      { field: 'title', headerName: 'Judul Buku', flex: 1, minWidth: 160 },
      { field: 'content', headerName: 'Catatan', flex: 2, minWidth: 220 },
      {
        field: 'aksi',
        headerName: 'Aksi',
        width: 170,
        sortable: false,
        renderCell: ({ row }) => (
          <BookNoteActions id={row.id} isDeleting={isDeleting} onDelete={handleDelete} />
        ),
      },
    ],
    [handleDelete, isDeleting],
  )

  return (
    <div className="mx-auto max-w-4xl p-4">
      <Card
        title={<span className="text-lg font-semibold">📚 Daftar Catatan Buku</span>}
        extra={
          <div className="flex flex-col gap-2 sm:flex-row">
            <Link to="/add">
              <Button type="primary">+ Tambah</Button>
            </Link>
            <Button danger onClick={logout}>
              Logout
            </Button>
          </div>
        }
      >
        {isError && (
          <div className="mb-4">
            <Alert type="error" message={getErrorMessage(error)} showIcon />
          </div>
        )}
        <div className="overflow-x-auto">
          <DataGrid
            rows={rows}
            columns={columns}
            loading={isLoading}
            autoHeight
            disableRowSelectionOnClick
            disableColumnMenu
            paginationMode="server"
            rowCount={meta?.totalData ?? 0}
            paginationModel={{ page: page - 1, pageSize: LIMIT }}
            onPaginationModelChange={(model) => setPage(model.page + 1)}
            pageSizeOptions={[LIMIT]}
            sx={{ minWidth: 600 }}
          />
        </div>
      </Card>
    </div>
  )
}

export default List
