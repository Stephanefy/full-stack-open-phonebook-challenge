import axios, { Axios, AxiosStatic } from "axios";



const request: Axios = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 5000
})

export default request
