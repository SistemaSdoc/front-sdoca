import { useAuth } from '@/context/AuthContext'
import { Loader2 } from 'lucide-react'

export default function Home() {
    const { user, loading } = useAuth()

    if (loading) return (
        <div className="fixed inset-0 flex items-center justify-center bg-white">
            <Loader2 className="w-8 h-8 text-gray-500 animate-spin" />
        </div>
    )

    return (
        <div>
            {user && <p>Olá, {user.name}</p>}
            <p>Home da dashboard</p>
        </div>
    )
}
