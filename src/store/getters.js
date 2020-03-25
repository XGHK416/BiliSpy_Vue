const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  base_info: state => state.user.base_info,
  user_id: state => state.user.user_id,
  auths: state => state.user.auths,
  roles:state => state.user.roles
}
export default getters
