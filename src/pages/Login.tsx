import { useState } from 'react'
import { Alert, Button, Card, Input } from 'antd'
import { useAuthStore } from '../stores/authStore'

function Login() {
  const login = useAuthStore((s) => s.login)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      setError('Email dan password harus diisi!')
      return
    }

    // Simulasi login. Nanti diganti Axios + TanStack Query (Tahap 4).
    // PublicOnlyRoute otomatis mengarahkan ke "/" setelah token terisi,
    // jadi tidak perlu navigate() lagi.
    login('token-palsu-12345', email)
  }

  return (
    <div className="mx-auto mt-16 max-w-sm px-4">
      <Card title={<span className="text-lg font-semibold">🔐 Login</span>}>
       {error && (
        <div className="mb-4">
          <Alert type="error" message={error} showIcon />
        </div>
          )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-sm">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              placeholder="Masukkan email"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm">Password</label>
            <Input.Password
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError('')
              }}
              placeholder="Masukkan password"
            />
          </div>

          <Button type="primary" htmlType="submit" block>
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