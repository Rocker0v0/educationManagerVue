import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const HomeChildOne =()=> import ('../views/HomeRight/HomeChildOne.vue')
const HomeChildTwo =()=> import ('../views/HomeRight/HomeChildTwo.vue')
const HomeChildThree =()=> import ('../views/HomeRight/HomeChildThree.vue')
const HomeChildFour =()=> import ('../views/HomeRight/HomeChildFour.vue')
const HomeChildSetting =()=> import ('../views/HomeRight/HomeChildSetting.vue')
const Login = () => import ('../views/Login.vue')
const Home=()=> import ('../views/Home.vue')

const routes = [
  {
    path: '',
    redirect: '/Login'
  },
  {
    path: '/Home',
    redirect: '/Home/HomeChildOne'
  },
  {
    path: '/Home',
    component:Home,
    children:[
     {
      path: "HomeChildOne",
      component: HomeChildOne
     },
     {
      path: "HomeChildTwo",
      component: HomeChildTwo
     },
     {
      path: "HomeChildThree",
      component: HomeChildThree
     },
     {
      path: "HomeChildFour",
      component: HomeChildFour
     },
     {
      path: "HomeChildSetting",
      component: HomeChildSetting
     }
    ]
  },
  {
    path:'/Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
