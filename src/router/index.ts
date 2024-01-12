import { createRouter, createWebHistory } from "vue-router";
import pinia from '@/store';
import { useRouterStore, type Nav } from '@/store/routerStore';
import Layout from "@/layout/index.vue";


let routes = [
  {
    path: '/',
    name: 'jsp',
    // redirect: '/home',
    component: () => import("@/views/home.vue"),
    children: [
      {
        path: "home",
        component: () => import("@/views/home.vue"),
        // component: () => import("@/views/pinia.vue"),
        // component: () => import("@/views/websocket.vue"),
        name: "home"
      }
    ]
  },
  {
    path: '/detail',
    component: () => import("@/views/detail.vue"),
  },
  {
    path: '/admin',
    redirect: '/admin/workbench',
    component: Layout,
    children: [
      {
        path: 'workbench',
        component: () => import("@/views/home-echart.vue"),
      },
      {
        path: 'ware-type',
        component: () => import("@/views/gpt/ware-type/index.vue"),
      },
      {
        path: 'ware',
        component: () => import("@/views/gpt/ware/index.vue"),
      },
      {
        path: 'config',
        component: () => import("@/views/gpt/config/index.vue"),
      },
      {
        path: 'order',
        component: () => import("@/views/gpt/order/index.vue"),
      },
    ]
  },
  {
    path: '/demo1',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: "table2",
        component: () => import("@/views/tables/table2.vue"),
        name: "table2"
      },
      {
        path: "table3",
        component: () => import("@/views/tables/table3.vue"),
        name: "table3"
      },
      {
        path: "draggable",
        component: () => import("@/views/tables/draggable.vue"),
        name: "draggable"
      }
    ]
  },
  {
    path: '/demo2',
    name: "demo2",
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'table2',
        component: () => import("@/views/tables/b.vue")
      }
    ]
  },
  {
    path: '/demo3',
    name: "demo3",
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'table3',
        component: () => import("@/views/tables/a.vue")
      }
    ]
  },
  {
    path: '/demo4',
    name: "demo4",
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'table4',
        component: () => import("@/views/tables/d.vue")
      }
    ]
  },
  {
    path: "/404",
    component: () => import("@/views/error-page/404.vue"),
  },
  {
    path: '/pinia',
    name: 'pinia',
    component: () => import('../views/pinia.vue')
  },
  {
    path: "/login",
    name: 'login',
    component: () => import("../views/login/index.vue"),
    meta: {
      hidden: true
    }
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// router.beforeEach((to, from, next) => {
//   if (to.path == '/login') {
//     next()
//   }
//   if (localStorage.getItem('token')) {
//     const routerStore = useRouterStore(pinia);
  
//     if (status) {
//       next()
//     } else {
//       console.log(2);
//       addRouter(routerStore.nav);
  
//       next({ ...to, replace: true });
//     }
//   } else {
//     next('/login')
//   }
// })

let status = false;
const addRouter = (data: Nav[]) => {
  data.map(item => {
    if (item.children && item.children.length > 0) {
      addRouter(item.children)
    } else {
      if (item.url) {
        let path = item.url.slice(1);
        if (path.includes('?')) {
          path = path.split('?')[0];
        }
        router.addRoute('jsp', { path, component: () => import('@/views/jsp/index.vue') });
      }
    }
  })
  router.addRoute({
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "ErrorPage",
    meta: {
      hidden: true
    }
  });
  status = true;
}

export default router;
