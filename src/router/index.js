import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import Login from '../components/Login.vue'
import yewujieshao from '../components/content/yewujieshao.vue'
import dailibaobei from '../components/content/dailibaobei.vue'
import kehubaobei from '../components/content/kehubaobei.vue'
import zhikebaobei from '../components/content/zhikebaobei.vue'
import zhixingbaobei from '../components/content/zhixingbaobei.vue'
import device from '@/utils/device'
// import zhikeReportBatchAdd from '@/components/batchOperateComponents/ZhikeReportBatchAdd.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', name: 'enter', redirect: device.isMobile ? '/mb/login' : '/login' },
    { path: '/index',
      component: Index,
      name: 'index',
      children: [
        { path: 'yewujieshao', component: yewujieshao, name: 'yewujieshao' },
        { path: 'dailibaobei', component: dailibaobei, name: 'dailibaobei' },
        { path: 'kehubaobei', component: kehubaobei, name: 'kehubaobei' },
        { path: 'zhikebaobei', component: zhikebaobei, name: 'zhikebaobei' },
        { path: 'zhikeReportBatchAdd', component: () => import('@/components/batchOperateComponents/ZhikeReportBatchAdd.vue'), name: 'zhikeReportBatchAdd' },
        { path: 'yewuReportBatchAdd', component: () => import('@/components/batchOperateComponents/YewuReportBatchAdd.vue'), name: 'yewuReportBatchAdd' },
        // { path: 'zhikeReportBatchAdd', component: () => import('@/components/batchOperateComponents/ZhikeReportBatchAdd.vue'), name: 'zhikeReportBatchAdd' },
        { path: 'zhixingbaobei', component: zhixingbaobei, name: 'zhixingbaobei' }
      ]
    },
    // { path: '/zhikeReportBatchAdd', component: zhikeReportBatchAdd, name: 'zhikeReportBatchAdd' },
    // { path: '/zhikeReportBatchAdd', component: () => import('@/components/batchOperateComponents/ZhikeReportBatchAdd.vue'), name: 'zhikeReportBatchAdd' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/mb',
      component: () => import('@/App.vue'),
      name: 'mb',
      redirect: '/mb/login',
      children: [
        { path: 'login', component: () => import('@/views/LoginMb.vue'), name: 'loginMb' },
        { path: 'register', component: () => import('@/views/RegisterMb.vue'), name: 'registerMb' },
        { path: 'index', component: () => import('@/views/IndexMb.vue'), name: 'indexMb' }
      ]
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   // console.log(to)
//   // if (to.name === 'enter') {
//   //   next({ name: device.isMobile ? 'loginMb' : 'login' })
//   //   return
//   // }
//   next()
// })

// 创建一个理由对象
export default router
