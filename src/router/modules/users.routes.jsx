import Users from '@/features/users/pages/index'
import NewUser from '@/features/users/pages/new'
import EditUser from '@/features/users/pages/edit'
import PermissionRoute from '../guards/PermissionRoute'

export const userRoutes = [
  {
    path: "users",
    element: (
      <PermissionRoute permissions={["admin-post"]}>
        <Users />
      </PermissionRoute>
    ),
  },
  {
    path: "users/new",
    element: (
      <PermissionRoute permissions={["admin-post"]}>
        <NewUser />
      </PermissionRoute>
    ),
  },
  {
    path: "users/edit/:id",
    element: (
      <PermissionRoute permissions={["admin-post"]}>
        <EditUser />
      </PermissionRoute>
    ),
  },
]
