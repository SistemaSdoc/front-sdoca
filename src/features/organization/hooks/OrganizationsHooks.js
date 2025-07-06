import axios from "@/lib/axios"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

// 1. Listar organizações
export function useOrganizations() {
    const { data: organizations = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ["organizations"],
        queryFn: async () => {
            const res = await axios.get("/organizacoes")
            return res.data.organizacoes
        },
        onError: () => toast.error("Erro ao carregar organizações"),
        staleTime: 1000 * 60 * 5, // 5 minutos
    })

    return { organizations, isLoading, isError, error, refetch }
}

// 2. Buscar uma organização pelo ID
export function useOrganization(id) {
    const { data: organization = {}, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["organization", id],
        queryFn: async () => {
            const res = await axios.get(`/organizacoes/${id}`)
            return res.data.organizacao
        },
        enabled: !!id, // só executa se tiver ID
        onError: () => toast.error("Erro ao buscar organização"),
        staleTime: 1000 * 60 * 5,
    })

    return { organization, isLoading, isError, error, refetch }
}

// 3. Criar uma nova organização
export function useCreateOrganization() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async (formData) => {
            const req = await axios.post("/organizacoes", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            return req.data
        },
        onSuccess: () => {
            toast.success("Organização criada com sucesso!")
            queryClient.invalidateQueries({ queryKey: ["organizations"] })
            navigate("/dashboard/organizations")
        },
        onError: () => toast.error("Erro ao criar organização"),
    })

    return mutation
}

// 4. Atualizar uma organização
export function useUpdateOrganization() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async ({ id, formData }) => {
            const req = await axios.put(`/organizacoes/${id}`, formData, {

            })
            return req.data
        },
        onSuccess: () => {
            toast.success("Organização atualizada com sucesso!")
            queryClient.invalidateQueries({ queryKey: ["organizations"] })
            navigate("/dashboard/organizations")
        },
        onError: () => toast.error("Erro ao atualizar organização"),
    })

    return mutation
}
