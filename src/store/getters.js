const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  froms: state => state.user.froms,
  menus: state => state.user.menus,
  currentMenu: state => state.user.currentMenu
}
export default getters
