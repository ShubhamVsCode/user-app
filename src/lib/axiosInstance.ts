import axios, { AxiosInstance } from "axios";

export const AXIOS_API: AxiosInstance = axios.create({
    baseURL: 'https://dashboardbackend.akashjayaraj.repl.co/',
});