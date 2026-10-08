import { lazy, Suspense, type ReactNode } from 'react'
import { createHashRouter } from 'react-router-dom'
import { Spin } from 'antd'
import { ProtectedRoute, PublicOnlyRoute } from './components/ProtectedRoute'

const Login = lazy(() => import('./pages/Login'))
const List = lazy(() => import('./pages/List'))
const Form = lazy(() => import('./pages/Form'))

const withSuspense = (node: ReactNode) => (
  <Suspense
    fallback={
      <div className="flex justify-center p-10">
        <Spin size="large" />
      </div>
    }
  >
    {node}
  </Suspense>
)

export const router = createHashRouter([
  {
    element: <PublicOnlyRoute />,
    children: [{ path: '/login', element: withSuspense(<Login />) }],
  },
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/', element: withSuspense(<List />) },
      { path: '/add', element: withSuspense(<Form />) },
      { path: '/edit/:id', element: withSuspense(<Form />) },
    ],
  },
])