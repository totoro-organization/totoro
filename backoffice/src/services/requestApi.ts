import axios from 'axios';
import { config } from './config';

export async function requestAxios(method: string, uri: string, data = null) {
    const token = localStorage.getItem('token') ?? null;
    
    try {
        if (!uri) {
            console.error('fonction de api requiere uri')
            return
        }
        var url = config.baseUrl + uri
        var headers = {'Content-Type': 'application/json', 'app_id': config.app_id}
        let request;
        method = method.toLowerCase()
        
        if (token) {
            headers['Authorization'] = 'Bearer ' + token;
        }

        if(method === 'get' || method === 'delete') {
            var conf: any = { 
                method,
                headers
            }
        
            if(data === null){
                conf.url = url
            } else {
                conf.url = url+'?'+data
            }
            request = await axios(conf);
        } else if(method === 'post' || method === 'put') {
            if(data === null) {
                data = {}
            }
            let options = {
                headers: headers
            }
            request = await axios[method](url, data, options);
        } else {
            return 'cette methode n\'est pas prise en compte par l\'api'
        }
        return {...request.data, status_code: request.status};
    } catch(error){
        if(error.response === undefined){
            //BACK OFFLINE
            return "offline";
        } else {
            return {
                error: error.response.data.message,
                status_code: error.response.status
            }
        }
    }
}