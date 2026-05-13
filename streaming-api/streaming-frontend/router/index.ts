import { createRouter, createWebHistory } from 'vue-router'
import Home from '../src/views/Home.vue'
import Search from '../src/views/Search.vue'
import MediaDetail from '../src/views/MediaDetail.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/media/search',
      name: 'search',
      component: Search,
      props: (route) => ({ q: route.query.q as string }),
    },
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/media/:type/:id',
      name: 'media-detail',
      component: MediaDetail,
      props: true,
    },
  ],
})

export default router
