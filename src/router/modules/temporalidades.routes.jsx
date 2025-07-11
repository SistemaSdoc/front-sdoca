import Temporalidades from '@/features/temporalidade/pages/index'
import NewTemporalidade from '@/features/temporalidade/pages/new'
import EditTemporalidade from '@/features/temporalidade/pages/edit'
// import ViewTemporalidade from '@/features/temporalidade/pages/view'
import PermissionRoute from '../guards/PermissionRoute'

export const temporalidadeRoutes = [
  {
    path: 'temps',
    element: (
      <PermissionRoute permissions={['admin-post']}>
        <Temporalidades />
      </PermissionRoute>
    ),
  },
  {
    path: 'temps/new',
    element: (
      <PermissionRoute permissions={['admin-post']}>
        <NewTemporalidade />
      </PermissionRoute>
    ),
  },
  {
    path: 'temps/edit/:id',
    element: (
      <PermissionRoute permissions={['admin-post']}>
        <EditTemporalidade />
      </PermissionRoute>
    ),
  },
  // {
  //   path: 'temps/:id',
  //   element: (
  //     <PermissionRoute permissions={['admin-post']}>
  //       <ViewTemporalidade />
  //     </PermissionRoute>
  //   ),
  // },
]
