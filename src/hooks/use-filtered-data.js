import { useState, useEffect } from 'react';
import { useSearch } from '@/context/SearchContext';

/**
 * Hook genérico para filtrar dados com base no termo de busca global
 * 
 * @param {Array} data - Array de dados a serem filtrados
 * @param {Array<string>} searchFields - Campos pelos quais filtrar (ex: ['nome', 'descricao'])
 * @param {Function} customFilter - Função de filtro personalizada (opcional)
 * @returns {Object} Objeto contendo os dados filtrados e funções relacionadas
 */
export function useFilteredData(data = [], searchFields = [], customFilter = null) {
  const { searchTerm } = useSearch();
  const [filteredData, setFilteredData] = useState([]);
  const [localFilter, setLocalFilter] = useState('');
  
  // Efeito para filtrar dados quando searchTerm, data ou localFilter mudam
  useEffect(() => {
    if (!data || data.length === 0) {
      setFilteredData([]);
      return;
    }

    // Se houver uma função de filtro personalizada, use-a
    if (customFilter && typeof customFilter === 'function') {
      setFilteredData(customFilter(data, searchTerm, localFilter));
      return;
    }

    // Filtro padrão baseado nos campos de busca
    const filtered = data.filter(item => {
      const termToSearch = (searchTerm || '').toLowerCase();
      
      // Se não houver termo de busca, retorne todos os itens
      if (!termToSearch) return true;
      
      // Verifica se algum dos campos de busca contém o termo
      return searchFields.some(field => {
        const fieldValue = item[field];
        
        // Verifica se o campo existe e não é nulo/undefined
        if (fieldValue === null || fieldValue === undefined) return false;
        
        // Converte para string e verifica se contém o termo
        return String(fieldValue).toLowerCase().includes(termToSearch);
      });
    });

    setFilteredData(filtered);
  }, [data, searchTerm, localFilter, searchFields, customFilter]);

  return {
    filteredData,
    setLocalFilter,
    localFilter,
    hasResults: filteredData.length > 0,
    hasFilter: !!searchTerm || !!localFilter,
  };
}