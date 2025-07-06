import { createBrowserRouter } from "react-router-dom"
import DashboardLayout from "@/layouts/DashboardLayout"
import Home from '@/pages/Home'
import { Login } from "@/features/auth/pages/Login"
import { Register } from "@/features/auth/pages/Register"
import PrivateRoute from "@/router/PrivateRoutes"
import GuestRoute from "@/router/GuestRoute"
import { AuthProvider } from "@/context/AuthContext"

import Organization from '@/features/organization/pages/index'
import NewOrganization from '@/features/organization/pages/new'
import EditOrganization from '@/features/organization/pages/edit'
import ViewOrganization from '@/features/organization/pages/view'

import Areas from '@/features/areas/pages/index'
import NewArea from '@/features/areas/pages/new'
import EditArea from '@/features/areas/pages/edit'
//import ViewOrganization from '@/pages/dashboard/organization/view'

import Users from '@/features/users/pages/index'
import NewUser from '@/features/users/pages/new'
import EditUser from '@/features/users/pages/edit'
//import ViewOrganization from '@/pages/dashboard/organization/view'

const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <AuthProvider>
                <GuestRoute>
                    <Login />
                </GuestRoute>
            </AuthProvider>
        )
    },
    {
        path: "/register",
        element: (
            <AuthProvider>
                <GuestRoute>
                    <Register />
                </GuestRoute>
            </AuthProvider>
        )
    },
    {
        path: "/dashboard",
        element: (
            <AuthProvider>
                <PrivateRoute>
                    <DashboardLayout />
                </PrivateRoute>
            </AuthProvider>
        ),
        children: [
            { index: true, element: <Home /> },

            // Organizations
            { path: "organizations", element: <Organization /> },
            { path: "organization/new", element: <NewOrganization /> },
            { path: "organization/edit/:id", element: <EditOrganization /> },
            { path: "organization/:id", element: <ViewOrganization /> },

            // Areas
            { path: "areas", element: <Areas /> },
            { path: "areas/new", element: <NewArea /> },
            { path: "areas/edit/:id", element: <EditArea /> },
            //{ path: "area/:id", element: <ViewArea /> },

            // Users
            { path: "users", element: <Users /> },
            { path: "users/new", element: <NewUser /> },
            { path: "users/edit/:id", element: <EditUser /> },
            //{ path: "area/:id", element: <ViewArea /> },
        ],
    }

])
export default router
