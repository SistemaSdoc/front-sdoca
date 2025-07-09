import axios from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// hook de carregar classificações
export function useClassificacoes() {
  const { data: classificacoes = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['classificacoes'],
    queryFn: async function () {
      const response = await axios.get('/classificacoes')
      console.log(response.data)
      return response.data.classificacoes
    },
    onError: () => {
      toast.error('Erro ao carregar classificações')
    },
    staleTime: 1000 * 60 * 5
  })

  return {
    classificacoes,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para carregar uma classificação
export function useClassificacao(id) {
  const { data = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['classificacao', id],
    queryFn: async function () {
      const response = await axios.get(`/classificacoes/${id}`)
      return response.data.classificacao
    },
    enabled: !!id,
    onError: () => {
      toast.error('Erro ao carregar classificação')
    },
    staleTime: 1000 * 60 * 5
  })

  return {
    classificacao: data,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para criar uma classificação
export function useCreateClassificacao() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (formData) {
      const request = await axios.post('/classificacoes', formData)
      return request.data
    },
    onSuccess: () => {
      toast.success('Classificação criada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['classificacoes'] })
      navigate('/dashboard/classifications')
    },
    onError: () => {
      toast.error('Erro ao criar classificação!')
    },
  })

  return mutation
}

// hook para atualizar uma classificação
export function useUpdateClassificacao() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function ({ id, formData }) {
      const request = await axios.put(`/classificacoes/${id}`, formData)
      console.log(request.data)
      return request.data
    },
    onSuccess: () => {
      toast.success('Classificação actualizada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['classificacoes'] })
      navigate('/dashboard/classifications')
    },
    onError: () => {
      toast.error('Erro ao atualizar classificação!')
    },
  })

  return mutation
}

// hook para deletar uma classificação
export function useDeleteClassificacao() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (id) {
      const request = await axios.delete(`/classificacoes/${id}`)
      return request.data
    },
    onSuccess: () => {
      toast.success('Classificação apagada com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['classificacoes'] })
      navigate('/dashboard/classifications')
    },
    onError: () => {
      toast.error('Erro ao apagar classificação!')
    },
  })

  return mutation
}
