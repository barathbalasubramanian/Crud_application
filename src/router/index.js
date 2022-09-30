import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import NewuserView from '../views/NewuserView.vue'
import UpdateuserView from '../views/UpdateuserView.vue'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/newuser',
    name: 'newuser',
    component: NewuserView
  },
  {
    path: '/allusers',
    name: 'allusers',
    component: () => import('../views/AlluserView.vue')
  },
  {
    path: '/newuser/:user_id',
    name:'Updateuser',
    component: UpdateuserView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
