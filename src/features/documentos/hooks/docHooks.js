import axios from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// hook para carregar documentos com base no filtro
export function useDocuments(filtro = "entradas", areaId) {
  const queryKey = ["documents", filtro, areaId] // ← inclui a área

  const { data: documents = [], isLoading, isError, error, refetch } = useQuery({
    queryKey,
    queryFn: async function () {
      const response = await axios.get(`/documentos?filtro=${filtro}`)
      return response.data.documentos
    },
    onError: () => {
      toast.error("Erro ao carregar documentos")
    },
    staleTime: 0, // força refetch sempre que entra na página
  })

  return {
    documents,
    isLoading,
    isError,
    error,
    refetch,
  }
}

// hook para carregar um único documento
export function useDocument(id) {
  const { data = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['document', id],
    queryFn: async function () {
      const response = await axios.get(`/documentos/${id}`)
      return response.data
    },
    enabled: !!id,
    onError: () => {
      toast.error('Erro ao carregar documento')
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

// hook para criar um documento
export function useCreateDocument() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (formData) {
      const response = await axios.post('/documentos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 🧠 ESSENCIAL!
        }
      })

      return response.data
    },
    onSuccess: () => {
      toast.success('Documento criado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      navigate('/dashboard/documents')
    },
    onError: () => {
      toast.error('Erro ao criar documento!')
    },
  })

  return mutation
}

// hook para atualizar um documento
export function useUpdateDocument() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function ({ id, formData }) {
      const response = await axios.put(`/documentos/${id}`, formData)
      return response.data
    },
    onSuccess: () => {
      toast.success('Documento atualizado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      navigate('/dashboard/documents')
    },
    onError: () => {
      toast.error('Erro ao atualizar documento!')
    },
  })

  return mutation
}

// hook para deletar um documento
export function useDeleteDocument() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (id) {
      const response = await axios.delete(`/documentos/${id}`)
      return response.data
    },
    onSuccess: () => {
      toast.success('Documento apagado com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      navigate('/dashboard/documents')
    },
    onError: () => {
      toast.error('Erro ao apagar documento!')
    },
  })

  return mutation
}

// hook para carregar dados para transferência da entrada
export function useTranferData(id) {
  const { data = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['transfer-data', id],
    queryFn: async function () {
      const response = await axios.get(`/documentos/transferir/${id}`)
      console.log("📦 Dados da API (useTranferData):", response.data)
      return response.data
    },
    enabled: !!id,
    onError: () => {
      toast.error('Erro ao carregar dados para transferência.')
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

export function useCreateTransfer() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function ({ id, formData }) {
      const response = await axios.post(`/documentos/transferir/${id}`, formData)
      return response.data
    },
    onSuccess: () => {
      toast.success('Documento transferido com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      // Invalidar também os dados de transferência para atualizar a UI
      queryClient.invalidateQueries({ queryKey: ['transfer-data'] })
    },
    onError: (error) => {
      console.error('Erro na transferência:', error)
      toast.error('Erro ao transferir documento!')
    },
  })

  return mutation
}