import Classifications from '@/features/classification/pages/index'
import NewClassification from '@/features/classification/pages/new'
import EditClassification from '@/features/classification/pages/edit'
// import ViewClassification from '@/features/classification/pages/view'
import PermissionRoute from '../guards/PermissionRoute'

export const classificationRoutes = [
	{
		path: 'classifications',
		element: (
			<PermissionRoute permissions={['admin-post']}>
				<Classifications />
			</PermissionRoute>
		),
	},
	{
		path: 'classifications/new',
		element: (
			<PermissionRoute permissions={['admin-post']}>
				<NewClassification />
			</PermissionRoute>
		),
	},
	{
		path: 'classifications/edit/:id',
		element: (
			<PermissionRoute permissions={['admin-post']}>
				<EditClassification />
			</PermissionRoute>
		),
	},
	// {
	//   path: 'classifications/:id',
	//   element: (
	//     <PermissionRoute permissions={['admin-post']}>
	//       <ViewClassification />
	//     </PermissionRoute>
	//   ),
	// },
]
