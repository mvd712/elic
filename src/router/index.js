import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/welcome.vue'
import Users from '../components/users/Users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Categories from '../components/shop/Categories.vue'
import Classification from '../components/shop/Classification.vue'
import Goods from '../components/shop/Goods.vue'
import Orders from '../components/order/Orders.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, name: 'login' },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/users', component: Users },
        { path: '/rights', component: Rights },
        { path: '/roles', component: Roles },
        { path: '/categories', component: Categories },
        { path: '/params', component: Classification },
        { path: '/goods', component: Goods },
        { path: '/orders', component: Orders }

      ]
    }

  ]
})

// 监听路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路由
  // from 从哪个路由跳转过来的
  // next() 执行下一个操作了
  if (to.path === '/login') {
    return next()
  }
  // // 如果不是/login, 判断你当前有没有登录的状态, 即token
  const token = window.sessionStorage.getItem('token')
  // //  如果没有获取到token值, 强制去跳转到login界面
  if (!token) return next('/login')
  //
  // // 如果拿到了, 则放行,
  next()
})

export default router
