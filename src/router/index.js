import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import Login from '../components/Login.vue'
import LoginMb from '../components/LoginMb.vue'
import yewujieshao from '../components/content/yewujieshao.vue'
import dailibaobei from '../components/content/dailibaobei.vue'
import kehubaobei from '../components/content/kehubaobei.vue'
import zhikebaobei from '../components/content/zhikebaobei.vue'
import zhixingbaobei from '../components/content/zhixingbaobei.vue'
import zhixingbaobeiMb from '../components/mb/zhixingbaobei.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/index',
      component: Index,
      name: 'index',
      children: [
        { path: 'yewujieshao', component: yewujieshao, name: 'yewujieshao' },
        { path: 'dailibaobei', component: dailibaobei, name: 'dailibaobei' },
        { path: 'kehubaobei', component: kehubaobei, name: 'kehubaobei' },
        { path: 'zhikebaobei', component: zhikebaobei, name: 'zhikebaobei' },
        { path: 'zhixingbaobei', component: zhixingbaobei, name: 'zhixingbaobei' }
      ]
    },
    { path: '/mb',
      component: Index,
      name: 'mb',
      children: [
        { path: 'zhixingbaobei', component: zhixingbaobeiMb, name: 'zhixingbaobeiMb' }
      ]
    },
    { path: '/login', component: Login },
    { path: '/mb/login', component: LoginMb, name: 'loginMb' }
  ]
})

// 创建一个理由对象
export default router
