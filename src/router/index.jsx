import { createBrowserRouter } from "react-router-dom"
import DashboardLayout from "@/layouts/DashboardLayout"
import Home from '@/pages/dashboard/Home'
import { Login } from "@/pages/auth/Login"
import { Register } from "@/pages/auth/Register"
import PrivateRoute from "@/router/PrivateRoutes"
import GuestRoute from "@/router/GuestRoute"
import { AuthProvider } from "@/context/AuthContext"

import Organization from '@/pages/dashboard/organization/index'
import NewOrganization from '@/pages/dashboard/organization/new'
import EditOrganization from '@/pages/dashboard/organization/edit'
import ViewOrganization from '@/pages/dashboard/organization/view'

import Areas from '@/pages/dashboard/area/index'
import NewArea from '@/pages/dashboard/area/new'
import EditArea from '@/pages/dashboard/area/edit'
//import ViewOrganization from '@/pages/dashboard/organization/view'

import Users from '@/pages/dashboard/user/index'
import NewUser from '@/pages/dashboard/user/new'
import EditUser from '@/pages/dashboard/user/edit'
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
