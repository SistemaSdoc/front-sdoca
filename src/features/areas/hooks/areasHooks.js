import axios from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


// hook de carregar areas
export function useAreas() {
    const { data: areas = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['areas'],
        queryFn: async function () {
            const response = await axios.get('/areas')
            console.log(response.data)
            return response.data.areas
        },
        onError: () => {
            toast.error('Erro ao carregar áreas')
        },
        staleTime: 1000 * 60 * 5
    })

    return {
        areas,
        isLoading,
        isError,
        error,
        refetch
    }
}

// hook para carregar uma area
export function useArea(id) {
    const { data = {}, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['area', id],
        queryFn: async function () {
            const response = await axios.get(`/areas/${id}`)
            return response.data.area
        },
        enabled: !!id,
        onError: () => {
            toast.error('Erro ao carregar área')
        },
        staleTime: 1000 * 60 * 5
    })

    return {
        area: data,
        isLoading,
        isError,
        error,
        refetch
    }
}

// hook para criar uma area
export function useCreateArea() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async function (formData) {
            // Garantir que departamento_id seja enviado para o backend
            const request = await axios.post('/areas', formData)
            return request.data
        },
        onSuccess: () => {
            toast.success('Área criada com sucesso!')
            queryClient.invalidateQueries({ queryKey: ['areas'] })
            navigate('/dashboard/areas')
        },
        onError: () => {
            toast.error('Erro ao criar área!')
        },
    })

    return mutation
}

// hook para atualizar uma area
export function useUpdateArea() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async function ({ id, formData }) {
            // Garantir que departamento_id seja enviado para o backend
            const request = await axios.put(`/areas/${id}`, formData)
            return request.data
        },
        onSuccess: () => {
            toast.success('Área actualizada com sucesso!')
            queryClient.invalidateQueries({ queryKey: ['areas'] })
            navigate('/dashboard/areas')
        },
        onError: () => {
            toast.error('Erro ao atualizar área!')
        },
    })

    return mutation
}

// hook para deletar uma area
export function useDeleteArea() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async function (id) {
            const request = await axios.delete(`/areas/${id}`)
            return request.data
        },
        onSuccess: () => {
            toast.success('Área apagada com sucesso!')
            queryClient.invalidateQueries({ queryKey: ['areas'] })
            navigate('/dashboard/areas')
        },
        onError: () => {
            toast.error('Erro ao apagar área!')
        },
    })

    return mutation
}
