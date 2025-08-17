/**
 * Configuração central para React Query
 * Este arquivo contém as configurações padrão para todas as consultas e mutações
 * usando React Query no projeto.
 */

// Tempo padrão que os dados são considerados "frescos" (em milissegundos)
// 5 minutos é um bom valor para a maioria dos casos
export const DEFAULT_STALE_TIME = 1000 * 60 * 5;

// Tempo padrão para retry em caso de erro (em milissegundos)
export const DEFAULT_RETRY_DELAY = 1000;

// Número máximo de tentativas em caso de erro
export const DEFAULT_RETRY_ATTEMPTS = 3;

// Configurações padrão para consultas (queries)
export const defaultQueryConfig = {
  staleTime: DEFAULT_STALE_TIME,
  retry: DEFAULT_RETRY_ATTEMPTS,
  retryDelay: DEFAULT_RETRY_DELAY,
  refetchOnWindowFocus: false, // Desativa refetch automático ao focar na janela
};

// Configurações específicas para consultas que precisam ser sempre atualizadas
export const alwaysFreshQueryConfig = {
  ...defaultQueryConfig,
  staleTime: 0, // Força refetch sempre
};

// Configurações padrão para mutações
export const defaultMutationConfig = {
  retry: DEFAULT_RETRY_ATTEMPTS,
  retryDelay: DEFAULT_RETRY_DELAY,
};

// Função auxiliar para criar chaves de consulta consistentes
export function createQueryKey(resource, id = null, params = null) {
  const key = [resource];
  
  if (id) {
    key.push(id);
  }
  
  if (params) {
    key.push(params);
  }
  
  return key;
}