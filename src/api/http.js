import axios from 'axios'
import qs from 'qs'
// create an axios instance
const service = axios.create({

  timeout: 5000 // request timeout
})

if (process.env.NODE_ENV == 'development') {    
  service.defaults.baseURL = '';} 
else {    
  service.defaults.baseURL = 'http://api.zhuishushenqi.com';
} 

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)


// response interceptor
service.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      console.log('err' + error) 
      return Promise.reject(error)
    }
  )
  
  function http(config){
    //动手脚
    if(config.method.toLowerCase() == 'post'){
      config.data = qs.stringify(config.data, { arrayFormat: 'repeat',allowDots: true  })
    }else{
      config.params = config.data
    }
  
    return  service(config);
  }
  export default http