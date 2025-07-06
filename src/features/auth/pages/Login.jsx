import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"

export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { Login, loading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    await Login({ email, password })
  }

  return (
    <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Faça login na sua conta</CardTitle>
            <CardDescription>
              Digite seu e-mail abaixo para acessar sua conta
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@exemplo.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Senha</Label>
                    <Link
                      to="/password-reset"
                      className="inline-block ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Esqueceu sua senha?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-3">
                  <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? "Entrando..." : "Login"}
                  </Button>
                  <Button variant="outline" className="w-full" type="button">
                    Login com a Google
                  </Button>
                </div>
              </div>
              <div className="mt-4 text-sm text-center">
                Não tem uma conta?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Criar
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
