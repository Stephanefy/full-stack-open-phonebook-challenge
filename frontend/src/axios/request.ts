import axios, { Axios, AxiosInstance } from "axios";

let baseURL = import.meta.env.DEV ? 'http://localhost:3001/api/' : "/api/"


const request: AxiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000
})

export default request
