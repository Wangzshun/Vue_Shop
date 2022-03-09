import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../components/Login.vue'
// import Home from '../components/Home.vue'
// import Welcome from '../components/Welcome.vue'
// import Users from '../components/user/Users.vue'
// import Rights from '../components/power/Rights.vue'
// import Roles from '../components/power/Roles.vue'
// import Cate from '../components/goods/Cate.vue'
// import Params from '../components/goods/Params.vue'
// import List from '../components/goods/List.vue'
// import Add from '../components/goods/Add.vue'
// import Order from '../components/order/Order.vue'
// import Report from '../components/report/Report.vue'
// 路由懒加载
const Login = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Login.vue')
const Home = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Home.vue')
const Welcome = () => import(/* webpackChunkName:"login_home_welcome" */ '../components/Welcome.vue')
const Users = () => import(/* webpackChunkName:"user_rights_roles" */ '../components/user/Users.vue')
const Rights = () => import(/* webpackChunkName:"user_rights_roles" */ '../components/power/Rights.vue')
const Roles = () => import(/* webpackChunkName:"user_rights_roles" */ '../components/power/Roles.vue')
const Cate = () => import(/* webpackChunkName:"cate_params" */ '../components/goods/Cate.vue')
const Params = () => import(/* webpackChunkName:"cate_param" */ '../components/goods/Params.vue')
const GoodsList = () => import(/* webpackChunkName:"list_add" */ '../components/goods/List.vue')
const Add = () => import(/* webpackChunkName:"list_add" */ '../components/goods/Add.vue')
const Order = () => import(/* webpackChunkName:"order_report" */ '../components/order/Order.vue')
const Report = () => import(/* webpackChunkName:"order_report" */ '../components/report/Report.vue')

Vue.use(VueRouter)

const router = new VueRouter({
  // 路由规则
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Cate },
        { path: '/params', component: Params },
        { path: '/goods', component: GoodsList },
        { path: '/goods/add', component: Add },
        { path: '/orders', component: Order },
        { path: '/reports', component: Report }
      ]
    }
  ]
})

// 为路由对象挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to表示将要访问的路径
  // from表示从那个路径跳转而来
  // next是一个函数，表示放行
  // next()放行，next('/login')强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
