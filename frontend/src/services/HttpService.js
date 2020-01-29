import history from '../history';
import Axios from 'axios';
////for json-server:
// const BASE_URL = process.env.NODE_ENV === 'production'
//     ? '/api/'
//     : '//localhost:3000'
////for real server:
const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : '//localhost:3030/api'

var axios = Axios.create({
    withCredentials: true
});

export default {
    get(endpoint, data){
        return ajax(endpoint, 'GET', data)
    },
    post(endpoint, data){
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data){
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data){
        return ajax(endpoint, 'DELETE', data)
    }
}


async function ajax(endpoint, method='get', data=null , dispatch) {
    console.log('ajax-endpoint',endpoint)
    console.log('ajax-data',data)
    console.log('ajax-method',method)
    try {
        const res = await axios({
            url: `${BASE_URL}${endpoint}`,
            method,
            data
        })
        return res.data;
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`);
        console.dir(err);
        if (err.response && err.response.status === 401) {
          history.push('/'); // diaspatch ('authorition error')
        }
          // diaspatch ('error')
          throw err; 
    }
}