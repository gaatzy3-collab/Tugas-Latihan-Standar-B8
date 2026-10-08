import { createHashRouter } from 'react-router-dom'
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute'
import { FormPage, ListPage, LoginPage } from './pages/lazy'

export const router = createHashRouter([
  {
    element: <PublicOnlyRoute />,
    children: [{ path: '/login', element: <LoginPage /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/', element: <ListPage /> },
      { path: '/add', element: <FormPage /> },
      { path: '/edit/:id', element: <FormPage /> },
    ],
  },
])
