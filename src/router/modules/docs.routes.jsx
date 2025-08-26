import Documents from '@/features/documentos/pages/index'
import NewDocument from '@/features/documentos/pages/new'
import EditDocument from '@/features/documentos/pages/edit'
import ViewDocument from '@/features/documentos/pages/view'
import FinalizarDocument from '@/features/documentos/pages/finalizar'
import PermissionRoute from '../guards/PermissionRoute'

export const documentRoutes = [
  {
    path: 'documents',
    element: (
      <PermissionRoute permissions={['user-post']}>
        <Documents />
      </PermissionRoute>
    ),
  },
  {
    path: 'documents/new',
    element: (
      <PermissionRoute permissions={['user-post']}>
        <NewDocument />
      </PermissionRoute>
    ),
  },
  {
    path: 'documents/finalizar/:id',
    element: (
      <PermissionRoute permissions={['user-post']}>
        <FinalizarDocument />
      </PermissionRoute>
    ),
  },
  {
    path: 'documents/edit/:id',
    element: (
      <PermissionRoute permissions={['user-post']}>
        <EditDocument />
      </PermissionRoute>
    ),
  },
  {
    path: 'documents/:id',
    element: (
      <PermissionRoute permissions={['user-post']}>
        <ViewDocument />
      </PermissionRoute>
    ),
  },
]
