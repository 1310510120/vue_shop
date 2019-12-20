import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login'
import '../assets/css/global.css'
import Home from '../components/Home.vue'

Vue.use(VueRouter)

const routes = [
 
]

const router = new VueRouter({
  routes:[
    { path: '/',component: Login },
    { path: '/login',component: Login },
    { path: '/home',component:Home }
  ] 
})

//挂着路由导航守卫
router.beforeEach((to,from,next)  => {
  //to将要访问的路径
  //from 代表从哪个路径填好钻
  //next是一个函数，表示放行 next()表示放行 next('/login) 强行跳转
  if(to.path == '/login') return next()
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login');
  next()
})
export default router
