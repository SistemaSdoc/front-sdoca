import axios from 'axios'

//axios.defaults.baseURL = 'http://localhost:8000' // Laravel backend 
axios.defaults.baseURL = 'https://app.sdoca.it.ao'
axios.defaults.withCredentials = true
axios.defaults.withXSRFToken = true 
export default axios
