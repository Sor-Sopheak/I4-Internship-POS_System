import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: "login",
    component: () => import('../views/Login.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/admin/AdminView.vue'),
    children: [
      {
        path: '/user',
        name: "user",
        component: () => import('../views/admin/admin-pages/Users.vue')
      },
      {
        path: '/category',
        name: "category",
        component: () => import('../views/admin/admin-pages/Categories.vue')
      },
      {
        path: '/product',
        name: "product",
        component: () => import('../views/admin/admin-pages/Products.vue')
      },
      {
        path: '/additional',
        name: 'additional',
        component: () => import('../views/admin/admin-pages/Additionals.vue')
      },
      {
        path: '/order',
        name: "order",
        component: () => import('../views/admin/admin-pages/Orders.vue')
      },
      {
        path: '/dashboard',
        name: "dashboard", 
        component: () => import('../views/admin/admin-pages/Dashboard.vue')
      }
    ]
  },
  {
    path: '/order-receiver',
    name: "receiver",
    component: () => import('../views/order-receiver/OrderReceiverView.vue')
  },
  {
    path: '/public-screen',
    name: "public",
    component: () => import('../views/public-screen/PublicScreenView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to, from, next) => {
  const adminRoute = routes.filter(obj => obj.name === 'admin')[0]
  const receiverRoute = routes.filter(obj => obj.name === 'receiver')[0]
  let adminPaths = []

  adminRoute.children.forEach(element => {
    adminPaths.push(element.path)
  });

  if(to.path == '/admin' || adminPaths.includes(to.path)) {
    if(localStorage.getItem('tokenAdmin')) {
      next()
    }
    else{
      next('/')
    }
  }
  else if (to.path === '/order-receiver' || to.path === receiverRoute.path) {
    if(localStorage.getItem('tokenReceiver')) {
      next()
    }
    else{
      next('/')
    }
  }
  else {
    next()
  }
});

export default router