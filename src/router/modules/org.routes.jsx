import Organization from '@/features/organization/pages/index'
import NewOrganization from '@/features/organization/pages/new'
import EditOrganization from '@/features/organization/pages/edit'
import ViewOrganization from '@/features/organization/pages/view'
import PermissionRoute from '../guards/PermissionRoute'

export const orgRoutes = [
  {
    path: 'organizations',
    element: (
      <PermissionRoute permissions={['super-admin-post']}>
        <Organization />
      </PermissionRoute>
    ),
  },
  {
    path: 'organization/new',
    element: (
      <PermissionRoute permissions={['super-admin-post']}>
        <NewOrganization />
      </PermissionRoute>
    ),
  },
  {
    path: 'organization/edit/:id',
    element: (
      <PermissionRoute permissions={['super-admin-post']}>
        <EditOrganization />
      </PermissionRoute>
    ),
  },
  {
    path: 'organization/:id',
    element: (
      <PermissionRoute permissions={['super-admin-post']}>
        <ViewOrganization />
      </PermissionRoute>
    ),
  },
]
