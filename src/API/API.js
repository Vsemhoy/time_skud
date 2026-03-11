import axios from "axios";
import {HTTP_ROOT} from "../CONFIG/config";

//const PROD_API_URL = 'http://89.104.68.50'
// export const PROD_API_URL = 'https://pulse-retail.ru'
export const PROD_AXIOS_INSTANCE = axios.create({
    baseURL: HTTP_ROOT,
    timeout: 10000,
});