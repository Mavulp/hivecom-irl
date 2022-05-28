import { createRouter, createWebHistory, NavigationGuardNext, RouteLocationNormalized } from "vue-router"

import Login from "./views/Login.vue"
import Home from "./views/Home.vue"
import AlbumDetail from "./views/AlbumDetail.vue"
import ImageDetail from "./views/ImageDetail.vue"
import AlbumList from "./views/AlbumList.vue"
import AlbumUpload from "./views/AlbumUpload.vue"

// Subchildren for user pages
import UserAlbums from "../components/user/UserAlbums.vue"
import UserProfile from "../components/user/UserProfile.vue"
import UserSettings from "../components/user/UserSettings.vue"

import beforeResolve from "./guards/beforeResolve"

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
        redirectOnAuth: "/home",
        disableNav: true,
        requiresAuth: false
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
      path: "/public/album/:id/:token",
      name: "PublicAlbumDetail",
      component: AlbumDetail,
      meta: {
        title: "Album Detail",
        disableNav: true,
        requiresAuth: false
      }
    },
    {
      path: "/album/:album/image/:image",
      name: "ImageDetail",
      component: ImageDetail,
      meta: {
        title: "Image Detail",
        disableNav: true,
        requiresAuth: true
      }
    },
    {
      path: "/public/album/:album/image/:image/:token",
      name: "PublicImageDetail",
      component: ImageDetail,
      meta: {
        title: "Image Detail",
        disableNav: true,
        requiresAuth: false
      }
    },
    {
      path: "/upload",
      name: "Upload",
      component: AlbumUpload,
      meta: {
        title: "Upload",
        requiresAuth: true
      }
    },
    {
      path: "/:user",
      name: "UserProfile",
      component: UserProfile,
      meta: {
        title: "User Profile",
        requiresAuth: true
      }
    },
    {
      path: "/user/settings",
      name: "UserSettings",
      component: UserSettings,
      meta: {
        title: "User Settings",
        requiresAuth: true
      }
    },
    {
      path: "/:user/albums",
      name: "UserAlbums",
      component: UserAlbums,
      meta: {
        title: "User Albums",
        requiresAuth: true
      }
    }
  ]
})

/**
 * Router Guards
 */

router.beforeResolve(beforeResolve)

export default router
