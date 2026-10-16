import { memo } from 'react'
import { Link } from 'react-router-dom'
import { Button, Popconfirm } from 'antd'

interface BookNoteActionsProps {
  id: number
  isDeleting: boolean
  onDelete: (id: number) => void
}

function BookNoteActions({ id, isDeleting, onDelete }: BookNoteActionsProps) {
  return (
    <div className="flex h-full items-center gap-2">
      <Link to={`/edit/${id}`}>
        <Button size="small" type="primary">
          Edit
        </Button>
      </Link>
      <Popconfirm
        title="Hapus catatan ini?"
        okText="Ya"
        cancelText="Batal"
        onConfirm={() => onDelete(id)}
      >
        <Button size="small" danger loading={isDeleting}>
          Hapus
        </Button>
      </Popconfirm>
    </div>
  )
}

export default memo(BookNoteActions)
