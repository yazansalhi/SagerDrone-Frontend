import Vue from 'vue'
import store from '../store/store'

import Router from 'vue-router'
import Login from '@/Pages/Login'
import SignUp from '@/Pages/SignUp'
import ForgotPassword from '@/Pages/ForgotPassword'
import SetPassword from '@/Pages/SetPassword'
import dashboard from '@/Pages/dashboard'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/forget-password',
      name: 'ForgotPassword',
      component: ForgotPassword
    },
 
    {
      path: '/dashboard',
      name: 'dashboard',
      beforeEnter: isLoggedIn,
      component: dashboard
    },
    { path: '/password/reset/:token/:email', component: SetPassword, name: 'SetPassword'},

  ],
  
  mode:'history'
})
function isLoggedIn(to, from, next) {

  if (!store.state.token) { // I WILL FIX IT ASP

      next('/login');
      return;
  }

  next();
}
