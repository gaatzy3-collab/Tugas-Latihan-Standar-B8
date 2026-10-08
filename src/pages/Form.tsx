import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Card, Input, Spin, message } from 'antd'
import { itemSchema, type ItemFormValues } from '../schemas/item'
import { useCreateItem, useItem, useUpdateItem } from '../hooks/useItems'

function Form() {
  const navigate = useNavigate()
  const { id } = useParams()
  const itemId = id ? Number(id) : undefined
  const isEditMode = itemId !== undefined

  const { control, handleSubmit, reset } = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: { name: '', description: '' },
  })

  const { data, isLoading, isError } = useItem(itemId)
  const createMutation = useCreateItem()
  const updateMutation = useUpdateItem()
  const isSaving = createMutation.isPending || updateMutation.isPending

  useEffect(() => {
    if (data?.data) {
      reset({ name: data.data.name, description: data.data.description })
    }
  }, [data, reset])

  const done = (text: string) => {
    message.success(text)
    navigate('/')
  }

  const onSubmit = (values: ItemFormValues) => {
    if (isEditMode) {
      updateMutation.mutate(
        { id: itemId, payload: values },
        {
          onSuccess: (res) => done(res.message),
          onError: () => message.error('Gagal mengupdate item'),
        },
      )
    } else {
      createMutation.mutate(values, {
        onSuccess: (res) => done(res.message),
        onError: () => message.error('Gagal menambahkan item'),
      })
    }
  }

  return (
    <div className="mx-auto max-w-xl p-4">
      <Card
        title={
          <span className="text-lg font-semibold">
            {isEditMode ? '✏️ Edit Item' : '➕ Tambah Item'}
          </span>
        }
        extra={<Button onClick={() => navigate('/')}>← Kembali</Button>}
      >
        {isEditMode && isError && (
          <div className="mb-4">
            <Alert type="error" message="Item tidak ditemukan" showIcon />
          </div>
        )}

        <Spin spinning={isEditMode && isLoading}>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <label className="mb-1 block text-sm">Nama</label>
                  <Input
                    {...field}
                    placeholder="Masukkan nama"
                    status={fieldState.error ? 'error' : undefined}
                  />
                  {fieldState.error && (
                    <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <label className="mb-1 block text-sm">Deskripsi</label>
                  <Input.TextArea
                    {...field}
                    rows={4}
                    placeholder="Masukkan deskripsi"
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