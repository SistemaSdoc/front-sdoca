import axios from 'axios'

// Laravel API (usa cookies e sessão)

//local
axios.defaults.baseURL = 'http://localhost:8000'

// Administração
//axios.defaults.baseURL = 'http://192.168.52.9:8000'

//cpanel
//axios.defaults.baseURL = 'https://app.sdoca.it.ao'

//axios.defaults.baseURL = 'http://192.168.1.205:8000'



axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true

// Instância separada pro scanner
const scanAPI = axios.create({
  baseURL: 'http://localhost:3333/api',
  withCredentials: false, 
})

export { scanAPI }
export default axios
