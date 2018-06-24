const getters = {
  sidebar: state => state.app.sidebar,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  role: state => state.user.role,
  user: state => state.user,
  isLoading: state => state.app.isLoading,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
}  

export default getters;