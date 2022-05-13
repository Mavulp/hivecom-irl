import { createRouter, createWebHistory } from "vue-router"

import Login from "./views/Login.vue"
import Home from "./views/Home.vue"
import AlbumDetail from "./views/AlbumDetail.vue"
import ImageDetail from "./views/ImageDetail.vue"
import AlbumList from "./views/AlbumList.vue"
import User from "./views/User.vue"
import AlbumUpload from "./views/AlbumUpload.vue"

// Subchildren for user pages
import UserAlbums from "../components/user/UserAlbums.vue"
import UserProfile from "../components/user/UserProfile.vue"
import UserSettings from "../components/user/UserSettings.vue"

import { useAuth } from "../store/auth"

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
        title: "Sign In",
        bread: "Sign in to hi!friends",
        redirectOnAuth: "/home"
      }
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
      meta: {
        title: "Home",
        bread: "Latest albums",
        requiresAuth: true
      }
    },
    {
      path: "/albums",
      name: "Albums",
      component: AlbumList,
      meta: {
        title: "All Albums",
        bread: "All albums from all users",
        requiresAuth: true
      }
    },
    {
      path: "/album/:id",
      name: "AlbumDetail",
      component: AlbumDetail,
      meta: {
        title: "_album_name_",
        bread: "_album_name_",
        requiresAuth: true
      }
    },
    {
      path: "/album/:id/image/:image",
      name: "ImageDetail",
      component: ImageDetail,
      meta: {
        title: "_image_name_",
        bread: "_image_name_",
        requiresAuth: true
      }
    },
    {
      path: "/upload",
      name: "Upload",
      component: AlbumUpload,
      meta: {
        title: "Upload",
        bread: "Upload a new album",
        requiresAuth: true
      }
    },
    {
      path: "/user/",
      name: "User",
      component: User,
      children: [
        {
          path: "/user/:id/profile",
          name: "UserProfile",
          component: UserProfile,
          meta: {
            title: "_user_profile_",
            bread: "_user_profile_",
            requiresAuth: true
          }
        },
        {
          path: "/user/settings",
          name: "UserSettings",
          component: UserSettings,
          meta: {
            title: "_user_settings_",
            bread: "_user_settings_",
            requiresAuth: true
          }
        },
        {
          path: "/user/:id/albums",
          name: "UserAlbums",
          component: UserAlbums,
          meta: {
            title: "_user_albums_",
            bread: "_user_albums_",
            requiresAuth: true
          }
        }
      ]
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
    const user = localStorage.getItem("user")

    if (!token || !user) {
      console.log("hello?")

      localStorage.removeItem("user")
      localStorage.removeItem("bearer_token")

      return next({ name: "Login" })
    } else {
      const auth = useAuth()
      auth.signInUserFromStorage(JSON.parse(user))
    }
  }

  // Handle authentication
  next()
})

export default router
