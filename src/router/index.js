import Vue from 'vue'
import Router from 'vue-router'
import slide from '@/page/slide'
import invite from '@/page'
import register from '@/page/register'
import inviteSuccess from '@/page/register-success'
import allcheckbox from '@/page/allcheckbox'
import reExp from '@/page/reExp'
import keep from '@/page/keepalive'


import '../assets/style/base.less'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      name: 'invite',
      component: invite
    }, {
      path: '/slide',
      name: 'slide',
      component: slide
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/invite-success',
      name: 'inviteSuccess',
      component: inviteSuccess
    },
    {
      path: '/allcheckbox',
      name: 'allcheckbox',
      component: allcheckbox
    },
    {
      path: '/reExp',
      name: 'reExp',
      component: reExp
    },
    {
        path: '/keep',
        name: 'keep',
        component: keep
      },
  ]
})
