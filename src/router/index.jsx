// src/router/index.js

import { createBrowserRouter } from "react-router-dom"
import DashboardLayout from "@/layouts/DashboardLayout"
import Home from "@/pages/Home"
import { authRoutes } from "./modules/auth.routes"
import { orgRoutes } from "./modules/org.routes"
import { userRoutes } from "./modules/users.routes"
import { documentRoutes } from "./modules/docs.routes"
import { temporalidadeRoutes } from "./modules/temporalidades.routes"
import { docTypeRoutes } from "./modules/doc-types.routes"
import { cabinetsRoutes } from "./modules/cabinets.routes"
import { areaRoutes } from "./modules/areas.routes"
import { Settingss } from "@/features/settings/pages"
import { drawersRoutes } from "./modules/drawers.routes"

import PrivateRoute from "./guards/PrivateRoutes"
import { AuthProvider } from "@/context/AuthContext"
import Landing from "@/features/landing/pages/Landing"

const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  ...authRoutes,
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
      { path: "settings", element: <Settingss /> },
      ...orgRoutes,
      ...userRoutes,
      ...documentRoutes,
      ...temporalidadeRoutes,
      ...cabinetsRoutes,
      ...docTypeRoutes,
      ...areaRoutes,
      ...drawersRoutes,
    ],
  },
])

export default router
