import axios from "axios";

//const PROD_API_URL = 'http://89.104.68.50'
export const PROD_API_URL = 'https://pulse-retail.ru'
export const PROD_AXIOS_INSTANCE = axios.create({
    baseURL: PROD_API_URL,
    timeout: 10000,
});