import Documents from '@/features/documentos/pages/index'
import NewDocument from '@/features/documentos/pages/new'
import EditDocument from '@/features/documentos/pages/edit'
import ViewDocument from '@/features/documentos/pages/view'
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
