import axios from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// hook para listar notificações
export function useNotificacoes(enabled = true) {
  const { data = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: ['notificacoes'],
    queryFn: async () => {
      const response = await axios.get('/notificacoes');
      return response.data.notificacoes;
    },
    enabled, // só busca quando enabled for true
    onError: () => {
      toast.error('Erro ao carregar notificações');
    },
    staleTime: 0,
  });

  return {
    notificacoes: data,
    isLoading,
    isError,
    error,
    refetch,
  };
}

// hook para atualizar uma notificação
export function useUpdateNotificacao() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ id, formData }) => {
      const response = await axios.put(`/notificacoes/${id}`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notificacoes'] });
    },
    onError: (error) => {
      console.error('Erro ao atualizar notificação: ', error);
    },
  });

  return mutation;
}
