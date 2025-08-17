/**
 * Template para hooks de features
 * Este arquivo serve como um modelo para criar hooks consistentes para cada feature
 * Copie e adapte este template para cada nova feature
 */

import axios from "@/lib/axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { defaultQueryConfig, alwaysFreshQueryConfig, defaultMutationConfig, createQueryKey } from "@/lib/react-query-config";

// Constantes para a feature
const RESOURCE_NAME = 'recurso'; // Altere para o nome do recurso (ex: 'documentos', 'temporalidades')
const RESOURCE_ENDPOINT = '/endpoint'; // Altere para o endpoint da API (ex: '/documentos', '/temporalidades')
const RESOURCE_ROUTE = '/dashboard/route'; // Altere para a rota no dashboard (ex: '/dashboard/documents')

// Mensagens de sucesso e erro
const SUCCESS_MESSAGES = {
  load: 'Dados carregados com sucesso',
  create: 'Recurso criado com sucesso!',
  update: 'Recurso atualizado com sucesso!',
  delete: 'Recurso excluído com sucesso!'
};

const ERROR_MESSAGES = {
  load: 'Erro ao carregar dados',
  create: 'Erro ao criar recurso!',
  update: 'Erro ao atualizar recurso!',
  delete: 'Erro ao excluir recurso!'
};

/**
 * Hook para carregar lista de recursos
 * @param {Object} params - Parâmetros adicionais para a consulta
 * @param {boolean} alwaysFresh - Se true, força refetch sempre que o hook é chamado
 */
export function useResourceList(params = {}, alwaysFresh = false) {
  const queryConfig = alwaysFresh ? alwaysFreshQueryConfig : defaultQueryConfig;
  
  const { data = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: createQueryKey(RESOURCE_NAME, null, params),
    queryFn: async function () {
      const response = await axios.get(RESOURCE_ENDPOINT, { params });
      return response.data[RESOURCE_NAME] || [];
    },
    onError: () => {
      toast.error(ERROR_MESSAGES.load);
    },
    ...queryConfig
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch
  };
}

/**
 * Hook para carregar um único recurso
 * @param {string|number} id - ID do recurso
 */
export function useResource(id) {
  const { data = {}, isLoading, isError, error, refetch } = useQuery({
    queryKey: createQueryKey(RESOURCE_NAME, id),
    queryFn: async function () {
      const response = await axios.get(`${RESOURCE_ENDPOINT}/${id}`);
      return response.data[RESOURCE_NAME.slice(0, -1)] || {}; // Remove o 's' final para singular
    },
    enabled: !!id,
    onError: () => {
      toast.error(ERROR_MESSAGES.load);
    },
    ...defaultQueryConfig
  });

  return {
    data,
    isLoading,
    isError,
    error,
    refetch
  };
}

/**
 * Hook para criar um recurso
 * @param {Object} options - Opções adicionais (ex: redirecionamento personalizado)
 */
export function useCreateResource(options = {}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const redirectPath = options.redirectPath || RESOURCE_ROUTE;

  const mutation = useMutation({
    mutationFn: async function (formData) {
      const response = await axios.post(RESOURCE_ENDPOINT, formData, {
        headers: options.multipart ? { 'Content-Type': 'multipart/form-data' } : undefined
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success(SUCCESS_MESSAGES.create);
      queryClient.invalidateQueries({ queryKey: [RESOURCE_NAME] });
      if (options.onSuccess) {
        options.onSuccess();
      } else {
        navigate(redirectPath);
      }
    },
    onError: (error) => {
      toast.error(ERROR_MESSAGES.create);
      if (options.onError) {
        options.onError(error);
      }
    },
    ...defaultMutationConfig
  });

  return mutation;
}

/**
 * Hook para atualizar um recurso
 * @param {Object} options - Opções adicionais (ex: redirecionamento personalizado)
 */
export function useUpdateResource(options = {}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const redirectPath = options.redirectPath || RESOURCE_ROUTE;

  const mutation = useMutation({
    mutationFn: async function ({ id, formData }) {
      const response = await axios.put(`${RESOURCE_ENDPOINT}/${id}`, formData, {
        headers: options.multipart ? { 'Content-Type': 'multipart/form-data' } : undefined
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success(SUCCESS_MESSAGES.update);
      queryClient.invalidateQueries({ queryKey: [RESOURCE_NAME] });
      if (options.onSuccess) {
        options.onSuccess();
      } else {
        navigate(redirectPath);
      }
    },
    onError: (error) => {
      toast.error(ERROR_MESSAGES.update);
      if (options.onError) {
        options.onError(error);
      }
    },
    ...defaultMutationConfig
  });

  return mutation;
}

/**
 * Hook para excluir um recurso
 * @param {Object} options - Opções adicionais (ex: redirecionamento personalizado)
 */
export function useDeleteResource(options = {}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const redirectPath = options.redirectPath || RESOURCE_ROUTE;

  const mutation = useMutation({
    mutationFn: async function (id) {
      const response = await axios.delete(`${RESOURCE_ENDPOINT}/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success(SUCCESS_MESSAGES.delete);
      queryClient.invalidateQueries({ queryKey: [RESOURCE_NAME] });
      if (options.onSuccess) {
        options.onSuccess();
      } else if (options.navigate !== false) {
        navigate(redirectPath);
      }
    },
    onError: (error) => {
      toast.error(ERROR_MESSAGES.delete);
      if (options.onError) {
        options.onError(error);
      }
    },
    ...defaultMutationConfig
  });

  return mutation;
}