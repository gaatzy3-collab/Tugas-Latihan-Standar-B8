import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, Card, Input } from 'antd'
import { useAuthStore } from '../stores/authStore'
import { login as loginRequest } from '../services/authService'
import { loginSchema, type LoginFormValues } from '../schemas/auth'
import { getErrorMessage } from '../lib/errorMessage'

function Login() {
  const login = useAuthStore((s) => s.login)
  const [apiError, setApiError] = useState('')

  const { control, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const loginMutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (res) => {
      if (res.data) login(res.data.token, res.data.user)
    },
    onError: (err) => setApiError(getErrorMessage(err)),
  })

  const onSubmit = (values: LoginFormValues) => {
    setApiError('')
    loginMutation.mutate(values)
  }

  return (
    <div className="mx-auto mt-16 max-w-sm px-4">
      <Card title={<span className="text-lg font-semibold">🔐 Login</span>}>
        {apiError && (
          <div className="mb-4">
            <Alert type="error" message={apiError} showIcon />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="mb-1 block text-sm">Email</label>
                <Input
                  {...field}
                  placeholder="Masukkan email"
                  status={fieldState.error ? 'error' : undefined}
                />
                {fieldState.error && (
                  <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="mb-1 block text-sm">Password</label>
                <Input.Password
                  {...field}
                  placeholder="Masukkan password"
                  status={fieldState.error ? 'error' : undefined}
                />
                {fieldState.error && (
                  <p className="mt-1 text-sm text-red-500">{fieldState.error.message}</p>
                )}
              </div>
            )}
          />

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loginMutation.isPending}
          >
            Login
          </Button>
        </form>

        <div className="mt-4">
          <Alert type="success" message="Email & password bebas! (Ini hanya simulasi)" />
        </div>
      </Card>
    </div>
  )
}

export default Login
