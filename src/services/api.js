import axios from 'axios';
import * as Config from './../configs/config'

export const callApi = (path, method, body) => {
    return axios({
        method: method,
        url: Config.apiURL + path,
        data: body,
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': localStorage.getItem('tokenServer')
        }
    })
};
