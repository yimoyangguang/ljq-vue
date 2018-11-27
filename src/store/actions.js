import axios from "./axios";

export default {
  async token({commit,dispatch}, params) {
      console.log(commit,'test',dispatch);
    return await axios.post('/connect/token', params);
  },
  async country({commit}, params) {
    return await axios.post('/comapi/v1.0/com/country.getlist', params);
  },
  async email_verifycode_send({commit}, params) {
    return await axios.post('/comapi/v1.0/com/email.verifycode.send', params);
  },
  async sms_verifycode_send({commit}, params) {
    return await axios.post('/comapi/v1.0/com/sms.verifycode.send', params);
  },
  async user_user_signup({commit}, params) {
    return await axios.post('/userapi/v1.0/user/user.signup', params);
  },
  async com_country_getlist({commit}, params, config) {
    return await axios.post('/comapi/v1.0/com/country.getlist', params, config)
  },
  //  检查用户注册时邮箱和手机是否存在
  async user_user_exist({commit}, params, config) {
    return await axios.post("/userapi/v1.0/user/user.exist", params, config);
  },
}
