export default function ({ route, store, redirect, app, i18n }) {
  if (app.$cookies.get('lang')) i18n.setLocale(app.$cookies.get('lang'))

  if (app.$cookies.get('Authorization')) {
    store.state.auth.Authorization = app.$cookies.get('Authorization')
    store.state.auth.checkAuth = true
  }

  const checkUser = store.state.auth.checkAuth
  
  //---------------
  if (!checkUser && [
    "forgetPassword___en","forgetPassword___ar"
  ].includes(route.name)) {
    return false
  }
  //  Invalid Access For Visitor
  if (!checkUser) {
    return redirect('')
  }
  
  //  Invalid Access For User

  if (
    checkUser &&
    ['login___en', 'login___ar', 'register___en', 'register___ar'].includes(
      route.path
    )
  ) {
    return redirect('')
  }
}
