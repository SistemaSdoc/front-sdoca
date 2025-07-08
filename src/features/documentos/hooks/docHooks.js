import axios from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


// hook de carregar documentos
export function useDocuments() {
  const { data = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['documents'],
    queryFn: async function () {
      const response = await axios.get('/documentos')
      console.log(response.data)
      return response.data.documentos
    },
    onError: () => {
      toast.error('Erro ao carregar documentos')
    },
    staleTime: 1000 * 60 * 5
  })

  return {
    documents: data,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para carregar um documento
export function useDocument(id) {
  const { data = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['document', id],
    queryFn: async function () {
      const response = await axios.get(`/documentos/${id}`)
      return response.data.documento
    },
    enabled: !!id,
    onError: () => {
      toast.error('Erro ao carregar documento')
    },
    staleTime: 1000 * 60 * 5
  })

  return {
    documento: data,
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
      const request = await axios.post('/documentos', formData)
      return request.data
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
      const request = await axios.put(`/documentos/${id}`, formData)
      return request.data
    },
    onSuccess: () => {
      toast.success('Documento actualizado com sucesso!')
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
      const request = await axios.delete(`/documentos/${id}`)
      return request.data
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
