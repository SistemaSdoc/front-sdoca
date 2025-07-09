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

import Documents from '@/features/documentos/pages/index'
//import NewDocument from '@/features/documentos/pages/new'
//import EditDocument from '@/features/documentos/pages/edit'
//import ViewDocument from '@/pages/dashboard/documentos/view'

import Temporalidades from '@/features/temporalidade/pages/index'
import NewTemporalidade from '@/features/temporalidade/pages/new'
import EditTemporalidade from '@/features/temporalidade/pages/edit'
//import ViewDocument from '@/pages/dashboard/documentos/view'

import Classifications from '@/features/classification/pages/index'
import NewClassification from '@/features/classification/pages/new'
import EditClassification from '@/features/classification/pages/edit'
//import ViewDocument from '@/pages/dashboard/documentos/view'

import DocTypes from '@/features/doc-type/pages/index'
import NewDocType from '@/features/doc-type/pages/new'
import EditDocType from '@/features/doc-type/pages/edit'
//import ViewDocument from '@/pages/dashboard/documentos/view'

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

            // Documents
            { path: "documents", element: <Documents /> },
            //{ path: "documents/new", element: <NewDocument /> },
            //{ path: "documents/edit/:id", element: <EditDocument /> },
            //{ path: "area/:id", element: <ViewArea /> },

            // Temporalidades
            { path: "temps", element: <Temporalidades /> },
            { path: "temps/new", element: <NewTemporalidade /> },
            { path: "temps/edit/:id", element: <EditTemporalidade /> },
            //{ path: "area/:id", element: <ViewArea /> },

            // Classifications
            { path: "classifications", element: <Classifications /> },
            { path: "classifications/new", element: <NewClassification /> },
            { path: "classifications/edit/:id", element: <EditClassification /> },
            //{ path: "classifications/:id", element: <ViewArea /> },

            // Doc types
            { path: "doc-types", element: <DocTypes /> },
            { path: "doc-types/new", element: <NewDocType /> },
            { path: "doc-types/edit/:id", element: <EditDocType /> },
            //{ path: "classifications/:id", element: <ViewArea /> 
        ],
    }

])
export default router
