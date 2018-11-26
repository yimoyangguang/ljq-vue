import Vue from 'vue'
import Router from 'vue-router'
import slide from '@/page/slide'
import invite from '@/page'
import register from '@/page/register'
import inviteSuccess from '@/page/register-success'
import allcheckbox from '@/page/paging/allcheckbox'
import reExp from '@/page/paging/reExp'
import keep from '@/page/paging/keepalive'
import paging from '@/page/paging/index'
import hover from '@/page/paging/hover'

import '../assets/style/base.less'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/',name: 'invite', component: invite}, 
    { path: '/slide',name: 'slide',component: slide},
    { path: '/register',name: 'register',component: register},
    { path: '/invite-success',name: 'inviteSuccess',component: inviteSuccess},
    {path: '/paging/allcheckbox',name: 'allcheckbox',component: allcheckbox},
    {path: '/paging/reExp',name: 'reExp',component: reExp},
    {path: '/paging/keep', name: 'keep',component: keep}, 
    { path: '/paging',name: 'paging',component: paging},
    { path: '/paging/hover',name: 'hover',component: hover},
  ]
})
