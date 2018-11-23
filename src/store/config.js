import Crypto from "./crypto.js";

let auth = 'https://auth.hex.com'
let api = 'https://api.hex.com'
let authapi = 'http://10.33.0.110:9000'
let localapi = 'http://10.33.0.110:9090'
const baseInfo = {
  'uid': 0,
  'version': '1.0',
  'timestamp': 0,
  'key': '',
  'ip': '',
  'platform': 'Web',
  'lang': 'zh_cn',
  'deviceid': 'browser'
}
let _ip = ''
export default {
  baseInfo,
  auth,
  api,
  authapi,
  localapi,
  async getToken(store) {
        return store.dispatch('token', store.state.tokenParams).then((data) => {
          store.commit('set_server_token', data);
          console.log(data,'getToken')
          return data;
        })
  },
  async getBaseInfo(store) {
    const info = baseInfo
    info.timestamp = new Date().getTime()
    return info
  },
  setHeader(store, config) {
    const token = store.state.hex_token.value
    const newConfig = token ? {
      Token: Crypto.md5Token(config.data),
      Authorization: token.token_type + ' ' + token.access_token
    } : {};
   console.log( Object.assign({}, config.headers, newConfig),'serHeader')
    return {
      headers: Object.assign({}, config.headers, newConfig)
    }
  },


}
