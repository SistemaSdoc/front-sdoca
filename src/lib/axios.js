import axios from 'axios';

// === Função para gerar a URL da API Laravel ===
const getLaravelApiUrl = () => {
  const { protocol, hostname } = window.location;

  // Ambiente de desenvolvimento
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8000';
  }

  // Produção: mesma origem, mas porta 8000 (ou ajuste conforme sua infra)
  // Ex: https://app.sdoca.it.ao → https://app.sdoca.it.ao:8000
  return `${protocol}//${hostname}:8000`;
};

// === Função para gerar a URL do Scanner API ===
const getScannerApiUrl = () => {
  const { protocol, hostname } = window.location;

  // Em desenvolvimento
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:3333/api';
  }

  // Em produção, pode ser:
  // - Mesmo domínio com rota diferente: https://app.sdoca.it.ao/scanner-api
  // - Subdomínio: https://scanner.sdoca.it.ao/api
  // - Ou outro serviço interno

  // Exemplo 1: usar rota no mesmo domínio
  // return `${protocol}//${hostname}/scanner-api`;

  // Exemplo 2: usar subdomínio
  return `https://scanner.${hostname}/api`;
};

// === Configuração da API Laravel ===
axios.defaults.baseURL = getLaravelApiUrl();
axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

// === Instância separada para o Scanner API ===
const scanAPI = axios.create({
  baseURL: getScannerApiUrl(),
  withCredentials: false, // ajuste se o scanner também usar sessão
});

export { scanAPI };
export default axios;
