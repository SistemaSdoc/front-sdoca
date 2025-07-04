import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000' // Laravel backend 
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true // só funciona no Axios 1.6+

export default axios
