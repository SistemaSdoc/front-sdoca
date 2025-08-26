import axios from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// hook de carregar departamentos
export function useDepartamentos() {
    const { data: departamentos = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['departamentos'],
        queryFn: async function () {
            const response = await axios.get('/departamentos')
            return response.data.departamentos
        },
        onError: () => {
            toast.error('Erro ao carregar departamentos')
        },
        staleTime: 1000 * 60 * 5
    })

    return {
        departamentos,
        isLoading,
        isError,
        error,
        refetch
    }
}

// hook para carregar um departamento
export function useDepartamento(id) {
    const { data = {}, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['departamento', id],
        queryFn: async function () {
            const response = await axios.get(`/departamentos/${id}`)
            return response.data.departamento
        },
        enabled: !!id,
        onError: () => {
            toast.error('Erro ao carregar departamento')
        },
        staleTime: 1000 * 60 * 5
    })

    return {
        departamento: data,
        isLoading,
        isError,
        error,
        refetch
    }
}

// hook para criar um departamento
export function useCreateDepartamento() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async function (formData) {
            const request = await axios.post('/departamentos', formData)
            return request.data
        },
        onSuccess: () => {
            toast.success('Departamento criado com sucesso!')
            queryClient.invalidateQueries({ queryKey: ['departamentos'] })
            navigate('/dashboard/departments')
        },
        onError: () => {
            toast.error('Erro ao criar departamento!')
        },
    })

    return mutation
}

// hook para atualizar um departamento
export function useUpdateDepartamento() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async function ({ id, formData }) {
            const request = await axios.put(`/departamentos/${id}`, formData)
            return request.data
        },
        onSuccess: () => {
            toast.success('Departamento atualizado com sucesso!')
            queryClient.invalidateQueries({ queryKey: ['departamentos'] })
            navigate('/dashboard/departamentos')
        },
        onError: () => {
            toast.error('Erro ao atualizar departamento!')
        },
    })

    return mutation
}

// hook para deletar um departamento
export function useDeleteDepartamento() {
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async function (id) {
            const request = await axios.delete(`/departamentos/${id}`)
            return request.data
        },
        onSuccess: () => {
            toast.success('Departamento excluído com sucesso!')
            queryClient.invalidateQueries({ queryKey: ['departamentos'] })
        },
        onError: () => {
            toast.error('Erro ao excluir departamento!')
        },
    })

    return mutation
}