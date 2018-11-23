import qs from 'qs'
import axios from 'axios'
import Crypto from "./crypto.js";
import AxiosConfig from './config'
import store from './store'

const headconfig = {
  headers: {
    'Authorization': "",
    post: {
      'Content-Type': 'application/hex'
    },
    common: {
      Accept: 'application/json, text/plain, */*'
    },
    'X-Requested-With': 'XMLHttpRequest',
    'Access-Control-Allow-Origin': '*'
  },

  timeout: 1000 * 60,
  data: null,
  withCredentials: false,
  responseType: 'json',
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN"
}

//请求拦截器
axios.interceptors.request.use(function (config) {
  headconfig.data = config.data;
  Object.assign(config, headconfig);
  if (config.url == '/connect/token') {
    config.url = '/token' + config.url;
    config.data = qs.stringify(config.data);
    config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    console.log(config, 'request.headers');
    return config
  }


  async function _g() {
    config.url = '/all' + config.url;
    const tokens = await AxiosConfig.getToken(store)
    const baseInfo = await AxiosConfig.getBaseInfo(store)
    if (config.data) {
      config.data = Object.assign({}, baseInfo, config.data)
    } else {
      config.data = baseInfo
    }
    console.log('request:' + config.url, config.data)
    console.log('响应体' + config.url, JSON.stringify(config.data))
    if (config.data) {
      const strData = JSON.stringify(config.data)
      config.data = strData ? Crypto.encrypt(strData, tokens.access_token) : '';
      const {headers} = AxiosConfig.setHeader(store, config)
      config.headers = headers;
      config.headers.post['Content-Type'] = 'application/hex';
      console.log(config.headers, 'header')
    }
    return config
  }
  return _g();
}, function (error) {
  return Promise.reject(error);
});


//对返回进行一些处理
axios.interceptors.response.use(response => {
  async function _new() {
    let _data = response.data,
      newData = null
    if (_data.access_token) {
      return _data
    }
    const tokens = await AxiosConfig.getToken(store);
    if (_data.code == '200') {
      
      if (_data.data) {
        newData = _data.data
      } else {
        newData = Crypto.decrypt(_data.hexdata, tokens.access_token);
        
        console.log(Crypto.decrypt(_data.hexdata, tokens.access_token), '----', Crypto)
      }
    } else {
      console.log(_data.msg, 'datas')
    }
    _data.data = newData
    //console.log('response:' + response.config.url, _data)
    return _data
  }

  return _new()
}, error => {
  return Promise.reject(error);
});

export default axios
