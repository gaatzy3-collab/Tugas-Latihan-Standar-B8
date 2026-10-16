import { lazy, Suspense, type ComponentType } from 'react'
import { Spin } from 'antd'

function withSuspense(Component: ComponentType) {
  return function LazyPage() {
    return (
      <Suspense
        fallback={
          <div className="flex justify-center p-10">
            <Spin size="large" />
          </div>
        }
      >
        <Component />
      </Suspense>
    )
  }
}

export const LoginPage = withSuspense(lazy(() => import('./Login')))
export const ListPage = withSuspense(lazy(() => import('./List')))
export const FormPage = withSuspense(lazy(() => import('./Form')))
