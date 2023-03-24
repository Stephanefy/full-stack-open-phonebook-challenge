import axios, { Axios, AxiosInstance } from "axios";



const request: AxiosInstance = axios.create({
    baseURL: '/api/',
    timeout: 5000
})

export default request
