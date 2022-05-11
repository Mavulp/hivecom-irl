import { createRouter, createWebHistory } from "vue-router"

import Login from "./views/Login.vue"
import Home from "./views/Home.vue"
import AlbumDetail from "./views/AlbumDetail.vue"
import ImageDetail from "./views/ImageDetail.vue"
import AlbumList from "./views/AlbumList.vue"

/**
 * Router Setup
 */
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/:pathMatch(.*)*",
      redirect: { name: "Login" }
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        title: "Sign In"
      }
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: {
        title: "Home",
        requiresAuth: true
      }
    },
    {
      path: "/albums",
      name: "Albums",
      component: AlbumList,
      meta: {
        title: "All Albums",
        requiresAuth: true
      }
    },
    {
      path: "/album/:id",
      name: "AlbumDetail",
      component: AlbumDetail,
      meta: {
        title: "Album Detail",
        requiresAuth: true
      }
    },
    {
      path: "/album/:id/image/:image",
      name: "ImageDetail",
      component: ImageDetail,
      meta: {
        title: "Image Detail",
        requiresAuth: true
      }
    }
  ]
})

/**
 * Router Guards
 */
router.afterEach((to) => {
  document.title = `${to.meta.title} // hi!friends`
})

router.beforeResolve(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    const token = localStorage.getItem("bearer_token")

    if (!token) {
      return next({ name: "Login" })
    }
  }

  // Handle authentication
  next()
})

export default router
