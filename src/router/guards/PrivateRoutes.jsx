import { Navigate } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { Loader2 } from "lucide-react"

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth()

  console.log("🛡️ PrivateRoute:", { user, loading })

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
      </div>
    )
  }

  if (!user) {
    console.log("🔒 Redirecionando pro login...")
    return <Navigate to="/login" />
  }

  return children
}
