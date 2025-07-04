import axios from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


// hook de carregar usuários
export function useUsersList() {
    //const navigate = useNavigate()

    const { data: users = [], isLoading, isError, error, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async function () {
            const response = await axios.get('/users')
            console.log(response.data.users)
            return response.data.users
        },
        onError: () => {
            toast.error('Erro ao carregar usuarios')
        },
        staleTime: 1000 * 60 * 5
    })

    return {
        users,
        isLoading,
        isError,
        error,
        refetch
    }
}

export function useCreateData() {
    //const navigate = useNavigate()

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['user_data'],
        queryFn: async function () {
            const response = await axios.get('/users/create')
            console.log(response.data)
            return response.data
        },
        onError: () => {
            toast.error('Erro ao carregar dados')
        },
        staleTime: 1000 * 60 * 5
    })

    return {
        data,
        isLoading,
        isError,
        error,
        refetch
    }
}

// hook para carregar um usuário
export function useUserShow(id) {
    //const navigate = useNavigate()

    const { data: user = {}, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['user', id],
        queryFn: async function () {
            const response = await axios.get(`/users/${id}`)
            return response.data.users
        },
        enabled: !!id,
        onError: () => {
            toast.error('Erro ao carregar usuário')
        },
        staleTime: 1000 * 60 * 5
    })

    return {
        user,
        isLoading,
        isError,
        error,
        refetch
    }
}

// hook para criar um usuário
export function useCreateUser() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async function (formData) {
            const request = await axios.post('/users', formData)
            return request.data
        },
        onSuccess: () => {
            toast.success('Usuário criado com sucesso!')
            queryClient.invalidateQueries({ queryKey: ['users'] })
            navigate('/dashboard/users')
        },
        onError: () => {
            toast.error('Erro ao criar usuário!')
        },
    })

    return mutation
}

export function useEditUser(id) {
    //const navigate = useNavigate()

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ['user_edit_data', id],
        queryFn: async function () {
            const response = await axios.get(`/users/edit/${id}`)
            return response.data
        },
        enabled: !!id,
        onError: () => {
            toast.error('Erro ao carregar dados')
        },
        staleTime: 1000 * 60 * 5
    })

    return {
        data,
        isLoading,
        isError,
        error,
        refetch
    }
}

// hook para atualizar uma area
export function useUpdateUser() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async function ({ id, formData }) {
            const request = await axios.put(`/users/${id}`, formData)
            return request.data
        },
        onSuccess: () => {
            toast.success('Usuário actualizado com sucesso!')
            queryClient.invalidateQueries({ queryKey: ['users'] })
            navigate('/dashboard/users')
        },
        onError: () => {
            toast.error('Erro ao atualizar usuário!')
        },
    })

    return mutation
}

// hook para deletar uma area
export function useDeleteUser() {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const mutation = useMutation({
        mutationFn: async function (id) {
            const request = await axios.delete(`/users/${id}`)
            return request.data
        },
        onSuccess: () => {
            toast.success('Usuário apagado com sucesso!')
            queryClient.invalidateQueries({ queryKey: ['users'] })
            navigate('/dashboard/users')
        },
        onError: () => {
            toast.error('Erro ao apagar usuário!')
        },
    })

    return mutation
}
