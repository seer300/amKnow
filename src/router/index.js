import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: resolve => require(['@/components/page/Login'], resolve)
        },
        {
            path: '/notFound',
            name: 'NotFound',
            component: resolve => require(['@/components/page/NotFound'], resolve)
        },
        {
            path: '/',
            redirect: '/login',
            name: 'Home',
            component: resolve => require(['@/components/common/Home'], resolve),
            children: [
                {
                    path: 'Dashboard',
                    name: 'Dashboard',
                    component: resolve => require(['@/components/page/Dashboard'], resolve),
                    meta: {
                        keepAlive: true // 需要缓存
                    }
                },
                // 添加案例页面
                {
                    path: 'addcase',
                    name: 'AddCase',
                    component: resolve => require(['@/components/page/AddCase'], resolve),
                    meta: {
                        keepAlive: true // 需要缓存
                    }
                },
                // 故障诊断页面
                {
                    path: 'faultDiagnosis',
                    name: 'fault-diagnosis',
                    component: resolve => require(['@/components/page/faultDiagnosis'], resolve),
                    meta: {
                        keepAlive: true // 需要缓存
                    }
                },
                // 案例管理 
                {
                    path: 'caseManage',
                    name: 'caseManage',
                    component: resolve => require(['@/components/page/caseManage'], resolve),
                    meta: {
                        keepAlive: true // 需要缓存
                    }
                },
                // 首页仪表盘
                {
                    path: 'home',
                    name: 'home',
                    component: resolve => require(['@/components/page/Home'], resolve),
                    meta: {
                        keepAlive: true // 需要缓存
                    }
                },
                // 技术学习
                {
                    path: 'study',
                    name: 'study',
                    component: resolve => require(['@/components/page/Study'], resolve),
                    meta: {
                        keepAlive: true // 需要缓存
                    }
                }
            ]
        },
        {
            path: '*',
            redirect: '/notFound'
        }
    ]
})
