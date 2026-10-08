import { createHashRouter } from 'react-router-dom'
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute'
import Login from './pages/Login'
import List from './pages/List'
import Form from './pages/Form'

export const router = createHashRouter([
  {
    element: <PublicOnlyRoute />,
    children: [{ path: '/login', element: <Login /> }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/', element: <List /> },
      { path: '/add', element: <Form /> },
      { path: '/edit/:id', element: <Form /> },
    ],
  },
])