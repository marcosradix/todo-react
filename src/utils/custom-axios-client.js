import axios from "axios";

const URL_API = 'https://minhastarefas-api.herokuapp.com';

const axiosClient = axios.create({
    baseURL: URL_API
});

axiosClient.interceptors.request.use((config) => {
    if(!config.url.endsWith('login')){
      config.headers['x-tenant-id'] = localStorage.getItem('userLogged');
    }
    config.headers['Accept'] =  "*/*";
    return config;
}, (error) => {
    return new Promise.reject(error);
});

export class AxiosClient {
    static getInstance() {
        return axiosClient;
    }
}