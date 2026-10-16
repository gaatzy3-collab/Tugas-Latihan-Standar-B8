import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Card, Input, Spin, message } from 'antd'
import { bookNoteSchema, type BookNoteFormValues } from '../schemas/bookNote'
import {
  useBookNote,
  useCreateBookNote,
  useUpdateBookNote,
} from '../hooks/useBookNotes'

function Form() {
  const navigate = useNavigate()
  const { id } = useParams()
  const noteId = id ? Number(id) : undefined
  const isEditMode = noteId !== undefined

  const { control, handleSubmit, reset } = useForm<BookNoteFormValues>({
    resolver: zodResolver(bookNoteSchema),
    defaultValues: { title: '', content: '' },
  })

  const { data, isLoading, isError } = useBookNote(noteId)
  const createMutation = useCreateBookNote()
  const updateMutation = useUpdateBookNote()
  const isSaving = createMutation.isPending || updateMutation.isPending

  useEffect(() => {
    if (data?.data) {
      reset({ title: data.data.title, content: data.data.content })
    }
  }, [data, reset])

  const done = (text: string) => {
    message.success(text)
    navigate('/')
  }

  const onSubmit = (values: BookNoteFormValues) => {
    if (isEditMode) {
      updateMutation.mutate(
        { id: noteId, payload: values },
        {
          onSuccess: (res) => done(res.message),
          onError: () => message.error('Gagal mengupdate catatan'),
        },
      )
    } else {
      createMutation.mutate(values, {
        onSuccess: (res) => done(res.message),
        onError: () => message.error('Gagal menambahkan catatan'),
      })
    }
  }

  return (
    <div className="mx-auto max-w-xl p-4">
      <Card
        title={
          <span className="text-lg font-semibold">
            {isEditMode ? '✏️ Edit Catatan Buku' : '➕ Tambah Catatan Buku'}
          </span>
        }
        extra={<Button onClick={() => navigate('/')}>← Kembali</Button>}
      >
        {isEditMode && isError && (
          <div className="mb-4">
            <Alert type="error" message="Catatan tidak ditemukan" showIcon />
          </div>
        )}

        <Spin spinning={isEditMode && isLoading}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <label className="mb-1 block text-sm">Judul Buku</label>
                  <Input
                    {...field}
                    placeholder="Masukkan judul buku"
                    status={fieldState.error ? 'error' : undefined}
                  />
                  {fieldState.error && (
                    <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="content"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <label className="mb-1 block text-sm">Catatan</label>
                  <Input.TextArea
                    {...field}
                    rows={4}
                    placeholder="Masukkan catatan"
                    status={fieldState.error ? 'error' : undefined}
                  />
                  {fieldState.error && (
                    <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />

            <div className="flex flex-col gap-2 sm:flex-row">
              <Button type="primary" htmlType="submit" loading={isSaving}>
                {isEditMode ? 'Update' : 'Tambah'}
              </Button>
              <Button onClick={() => navigate('/')}>Batal</Button>
            </div>
          </form>
        </Spin>
      </Card>
    </div>
  )
}

export default Form