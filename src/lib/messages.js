/**
 * Mensagens padronizadas para o sistema
 * Este arquivo centraliza todas as mensagens de sucesso e erro
 * para garantir consistência em toda a aplicação
 */

// Mensagens genéricas
const GENERIC = {
  success: {
    load: 'Dados carregados com sucesso',
    create: 'Registro criado com sucesso!',
    update: 'Registro atualizado com sucesso!',
    delete: 'Registro excluído com sucesso!'
  },
  error: {
    load: 'Erro ao carregar dados',
    create: 'Erro ao criar registro!',
    update: 'Erro ao atualizar registro!',
    delete: 'Erro ao excluir registro!',
    network: 'Erro de conexão. Verifique sua internet.',
    server: 'Erro no servidor. Tente novamente mais tarde.',
    unauthorized: 'Acesso não autorizado. Faça login novamente.',
    validation: 'Erro de validação. Verifique os dados informados.'
  }
};

// Mensagens específicas por recurso
const RESOURCES = {
  // Documentos
  documentos: {
    success: {
      load: 'Documentos carregados com sucesso',
      create: 'Documento criado com sucesso!',
      update: 'Documento atualizado com sucesso!',
      delete: 'Documento excluído com sucesso!',
      archive: 'Documento arquivado com sucesso!',
      finalize: 'Documento finalizado com sucesso!'
    },
    error: {
      load: 'Erro ao carregar documentos',
      create: 'Erro ao criar documento!',
      update: 'Erro ao atualizar documento!',
      delete: 'Erro ao excluir documento!',
      archive: 'Erro ao arquivar documento!',
      finalize: 'Erro ao finalizar documento!'
    }
  },
  
  // Temporalidades
  temporalidades: {
    success: {
      load: 'Temporalidades carregadas com sucesso',
      create: 'Temporalidade criada com sucesso!',
      update: 'Temporalidade atualizada com sucesso!',
      delete: 'Temporalidade excluída com sucesso!'
    },
    error: {
      load: 'Erro ao carregar temporalidades',
      create: 'Erro ao criar temporalidade!',
      update: 'Erro ao atualizar temporalidade!',
      delete: 'Erro ao excluir temporalidade!'
    }
  },
  
  // Armários (Cabinets)
  armarios: {
    success: {
      load: 'Armários carregados com sucesso',
      create: 'Armário criado com sucesso!',
      update: 'Armário atualizado com sucesso!',
      delete: 'Armário excluído com sucesso!'
    },
    error: {
      load: 'Erro ao carregar armários',
      create: 'Erro ao criar armário!',
      update: 'Erro ao atualizar armário!',
      delete: 'Erro ao excluir armário!'
    }
  },
  
  // Gavetas (Drawers)
  gavetas: {
    success: {
      load: 'Gavetas carregadas com sucesso',
      create: 'Gaveta criada com sucesso!',
      update: 'Gaveta atualizada com sucesso!',
      delete: 'Gaveta excluída com sucesso!'
    },
    error: {
      load: 'Erro ao carregar gavetas',
      create: 'Erro ao criar gaveta!',
      update: 'Erro ao atualizar gaveta!',
      delete: 'Erro ao excluir gaveta!'
    }
  },
  
  // Usuários
  usuarios: {
    success: {
      load: 'Usuários carregados com sucesso',
      create: 'Usuário criado com sucesso!',
      update: 'Usuário atualizado com sucesso!',
      delete: 'Usuário excluído com sucesso!',
      password: 'Senha alterada com sucesso!'
    },
    error: {
      load: 'Erro ao carregar usuários',
      create: 'Erro ao criar usuário!',
      update: 'Erro ao atualizar usuário!',
      delete: 'Erro ao excluir usuário!',
      password: 'Erro ao alterar senha!'
    }
  },
  
  // Autenticação
  auth: {
    success: {
      login: 'Login realizado com sucesso!',
      logout: 'Logout realizado com sucesso!',
      register: 'Registro realizado com sucesso!',
      password: 'Senha redefinida com sucesso!'
    },
    error: {
      login: 'Erro ao fazer login. Verifique suas credenciais.',
      logout: 'Erro ao fazer logout.',
      register: 'Erro ao registrar usuário.',
      password: 'Erro ao redefinir senha.',
      session: 'Sessão expirada. Faça login novamente.'
    }
  }
};

/**
 * Função para obter mensagem de sucesso
 * @param {string} resource - Nome do recurso (ex: 'documentos', 'temporalidades')
 * @param {string} action - Ação realizada (ex: 'load', 'create', 'update', 'delete')
 * @returns {string} Mensagem de sucesso
 */
export function getSuccessMessage(resource, action) {
  return RESOURCES[resource]?.success?.[action] || GENERIC.success[action] || 'Operação realizada com sucesso!';
}

/**
 * Função para obter mensagem de erro
 * @param {string} resource - Nome do recurso (ex: 'documentos', 'temporalidades')
 * @param {string} action - Ação realizada (ex: 'load', 'create', 'update', 'delete')
 * @returns {string} Mensagem de erro
 */
export function getErrorMessage(resource, action) {
  return RESOURCES[resource]?.error?.[action] || GENERIC.error[action] || 'Ocorreu um erro. Tente novamente.';
}

// Exporta as constantes para uso direto
export const MESSAGES = {
  GENERIC,
  RESOURCES
};