import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';
import bus from "@/bus"; 
import Component from 'vue-class-component';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  }, 
  {
    path: '/terms',
    name: 'Terms',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Terms.vue')
  },
  {
    path: '/removed',
    name: 'Removed',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Removed.vue')
  },
  {
    path: '/adm',
    name: 'Admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  }, 
  {
    path: '/privacy',
    name: 'Privacy',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Privacy.vue')
  },
  {
    path: '/plan01',
    name: 'Plan01',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Plan01.vue')
  },
  {
    path: '/alerts',
    name: 'Alerts',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Alerts.vue')
  },
  {
    path: '/configAlert',
    name: 'ConfigAlert',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ConfigAlert.vue')
  },
  {
    path: '/alert',
    name: 'Alert',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Alert.vue')
  },
  
];

/*
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  
})
*/

class RouterTaulukko extends VueRouter {

  constructor () {
    super({
      mode: 'history',
      base: process.env.BASE_URL,
      routes:routes as RouteConfig[],
    });
  }
 
}

const router = new RouterTaulukko();

router.beforeResolve((to, from, next) => {
  next();
   
  //  console.log("beforeResolve route: remover depois de usar, to, next", to , next);

    bus.emitOnRouteChange(from,to); 
})
 

router.beforeEach((to, from, next) => { 
  //console.log("beforeEach route: remover depois de usar, to, next", to , next);
  next();
})
 

export default router;
