const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  headPortrait: state => state.user.headPortrait,
  nickName: state => state.user.nickName
}
export default getters
