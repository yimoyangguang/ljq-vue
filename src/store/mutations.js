export function set_server_token(state, token) {
  state.hex_token.value = token;
  state.hex_token.value[state.hex_timestamp.type] = new Date((new Date()).getTime() + 110 * 60 * 1000)
}
/*更新用户信息*/
export function set_user_info(state, {data, hexdata}) {
  state.hex_server_user_info.value = hexdata
  state.hex_uid.value = data.uid
  state.hex_key.value = data.secretkey
}


export function set_message(state, params) {
  state.message = Object.assign({}, params)
}


export function set_ip(state, ip) {
  state.ip = ip
}
