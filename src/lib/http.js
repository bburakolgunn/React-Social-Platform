import axios from "axios";
import { i18nInstance } from "../locales";

const http = axios.create();




http.interceptors.request.use((config) => {

    config.headers['Accept-Language'] = i18nInstance.language
    //if(authToken){
        //config.headers['Authorization'] = `${authToken.prefix} ${authToken.token}`
        //Burada set edilen token context teki login-success sonucunda dönen action içinde token var,bu token
        //setToken'a verilir,böylece intercepter'de artık bir sonra request gittiğinde o tokendan aldığımız datalarla
        //Authorization header'ını güncellemiş oluyoruz.
   // }
    return  config;
})


export default http;