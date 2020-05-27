import axios from 'axios'

const instance = axios.create({
// baseURL: 'http://172.27.172.62:9300/api/',
baseURL: 'http://10.11.13.60:9300/api/',
// baseURL: 'http://172.27.172.46:9300/api/'
// baseURL: 'http://172.27.172.69:9300/api/'
// baseURL: 'http://172.27.172.22:9300/api/'
// baseURL: 'http://pmo-demo.herokuapp.com/api/'
//baseURL: 'http://192.168.0.105:9300/api/'
  // baseURL: 'http://10.21.16.83:9300/api/'
   //baseURL: 'http://10.21.16.5:4040/api/' 
});
export default instance;