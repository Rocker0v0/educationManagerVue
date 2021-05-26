import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const HomeChildOne = () => import('../views/HomeRight/HomeChildOne.vue')
const HomeChildTwo = () => import('../views/HomeRight/HomeChildTwo.vue')
const HomeChildThree = () => import('../views/HomeRight/HomeChildThree.vue')
const HomeChildFour = () => import('../views/HomeRight/HomeChildFour.vue')
const HomeChildSex = () => import('../views/HomeRight/HomeChildSex.vue')
const HomeChildFive = () => import('../views/HomeRight/HomeChildFive.vue')
const HomeChildSeven = () => import('../views/HomeRight/HomeChildSeven.vue')
const HomeChildEight = () => import('../views/HomeRight/HomeChildEight.vue')
const HomeChildNine = () => import('../views/HomeRight/HomeChildNine.vue')
const welcome = () => import('../views/HomeRight/welcome.vue')
const Login = () => import('../views/Login.vue')
const Home = () => import('../views/Home.vue')
const Student = () => import('../views/Student.vue')
const Teacher = () => import('../views/Teacher.vue')
const StudentChildOne = ()=> import('../views/StudentChild/StudentChildOne.vue')
const StudentChildTwo = ()=> import('../views/StudentChild/StudentChildTwo.vue')
const StudentChildThree = ()=> import('../views/StudentChild/StudentChildThree.vue')
const StudentChildFour = ()=> import('../views/StudentChild/StudentChildFour.vue')
const welcomeStudent = ()=> import('../views/StudentChild/welcomeStudent.vue')
const TeacherChildOne = ()=> import('../views/TeacherChild/TeacherChildOne.vue')
const TeacherChildTwo = ()=> import('../views/TeacherChild/TeacherChildTwo.vue')
const welcomeTeacher = ()=> import('../views/TeacherChild/welcomeTeacher.vue')

const routes = [
  {
    path: '',
    redirect: '/Login'
  },
  {
    path: '/Home',
    redirect: '/Home/welcome'
  },
  {
    path: '/Student',
    redirect: '/Student/welcomeStudent'
  },
  {
    path: '/Teacher',
    redirect: '/Teacher/welcomeTeacher'
  },
  {
    path: '/Student',
    component:Student,
    children:[
      {
        path: "StudentChildOne",
        component: StudentChildOne
      },
      {
        path: "StudentChildFour",
        component: StudentChildFour
      },
      {
        path: "welcomeStudent",
        component: welcomeStudent
      },
      {
        path: "StudentChildTwo",
        component: StudentChildTwo
      },
      {
        path: "StudentChildThree",
        component: StudentChildThree
      }
    ]
  },
  {
    path: '/Teacher',
    component:Teacher,
    children:[
      {
        path: "TeacherChildOne",
        component: TeacherChildOne
      },
      {
        path: "welcomeTeacher",
        component: welcomeTeacher
      },
      {
        path: "TeacherChildTwo",
        component: TeacherChildTwo
      }
    ]
  },
  {
    path: '/Home',
    component: Home,
    children: [
      {
        path: "HomeChildOne",
        component: HomeChildOne
      },
      {
        path: "welcome",
        component: welcome
      },
      {
        path: "HomeChildNine",
        component: HomeChildNine
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
        path: "HomeChildSex",
        component: HomeChildSex
      },
      {
        path: "HomeChildFive",
        component: HomeChildFive
      }
      ,
      {
        path: "HomeChildSeven",
        component: HomeChildSeven
      }
      ,
      {
        path: "HomeChildEight",
        component: HomeChildEight
      }
    ]
  },
  {
    path: '/Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})




export default router
