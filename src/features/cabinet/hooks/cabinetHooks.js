import axios from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// hook de carregar cabinets
export function useCabinets() {
  const { data: cabinets = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['cabinets'],
    queryFn: async function () {
      const response = await axios.get('/armarios') // mantém o endpoint em pt
      console.log(response.data)
      return response.data.armarios
    },
    onError: () => {
      toast.error('Failed to load cabinets')
    },
    staleTime: 1000 * 60 * 5
  })

  return {
    cabinets,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para carregar um cabinet
export function useCabinet(id) {
  const { data = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['cabinet', id],
    queryFn: async function () {
      const response = await axios.get(`/armarios/${id}`)
      return response.data.armario
    },
    enabled: !!id,
    onError: () => {
      toast.error('Failed to load cabinet')
    },
    staleTime: 1000 * 60 * 5
  })

  return {
    cabinet: data,
    isLoading,
    isError,
    error,
    refetch
  }
}

// hook para criar um cabinet
export function useCreateCabinet() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (formData) {
      const request = await axios.post('/armarios', formData)
      return request.data
    },
    onSuccess: () => {
      toast.success('Cabinet created successfully!')
      queryClient.invalidateQueries({ queryKey: ['cabinets'] })
      navigate('/dashboard/cabinets')
    },
    onError: () => {
      toast.error('Failed to create cabinet!')
    },
  })

  return mutation
}

// hook para atualizar um cabinet
export function useUpdateCabinet() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function ({ id, formData }) {
      const request = await axios.put(`/armarios/${id}`, formData)
      console.log(request.data)
      return request.data
    },
    onSuccess: () => {
      toast.success('Cabinet updated successfully!')
      queryClient.invalidateQueries({ queryKey: ['cabinets'] })
      navigate('/dashboard/cabinets')
    },
    onError: () => {
      toast.error('Failed to update cabinet!')
    },
  })

  return mutation
}

// hook para deletar um cabinet
export function useDeleteCabinet() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: async function (id) {
      const request = await axios.delete(`/armarios/${id}`)
      return request.data
    },
    onSuccess: () => {
      toast.success('Cabinet deleted successfully!')
      queryClient.invalidateQueries({ queryKey: ['cabinets'] })
      navigate('/dashboard/cabinets')
    },
    onError: () => {
      toast.error('Failed to delete cabinet!')
    },
  })

  return mutation
}
