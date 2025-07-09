import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "@/lib/axios"
import { toast } from "sonner"

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        fetchUser()
    }, [])

    async function fetchUser() {
        setLoading(true)
        try {
            const response = await axios.get("/user")
            console.log('usuario básico: ', response.data)
            console.log('ID do usuário básico: ', response.data.id)

            const fullData = await axios.get(`/users/${response.data.id}`)
            setUser(fullData.data)
            console.log("User completo:", fullData.data.user)

        } catch (err) {
            console.error("❌ Erro em fetchUser:", err)
            setUser(null)
            setError(err)
        } finally {
            setLoading(false)
        }
    }

    async function Register(data) {
        setLoading(true)
        try {
            await axios.get("/sanctum/csrf-cookie")
            await axios.post("/register", data)
            await fetchUser()
            toast.success("Conta criada com sucesso!")
            navigate("/dashboard")
        } catch (err) {
            setError(err)
            toast.error(err?.response?.data?.message || "Erro ao registrar")
        } finally {
            setLoading(false)
        }
    }

    async function Login(credentials) {
        setLoading(true)
        try {
            await axios.get("/sanctum/csrf-cookie")
            await axios.post("/login", credentials)
            await fetchUser()
            toast.success("Login realizado com sucesso!")
            navigate("/dashboard")
        } catch (err) {
            setError(err)
            toast.error(err?.response?.data?.message || "Erro ao fazer login")
        } finally {
            setLoading(false)
        }
    }

    async function Logout() {
        setLoading(true)
        try {
            await axios.post("/logout")
            setUser(null)
            toast.success("Sessão terminada!")
            navigate("/login")
        } catch (err) {
            setError(err)
            toast.error(err?.response?.data?.message || "Erro ao sair")
        } finally {
            setLoading(false)
        }
    }

    function hasRole(...roles) {
        return roles.includes(user?.role)
    }

    return (
        <AuthContext.Provider value={{ user, loading, error, Login, Register, Logout, hasRole }}>
            {children}
        </AuthContext.Provider>
    )
}




// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    return useContext(AuthContext)
}
