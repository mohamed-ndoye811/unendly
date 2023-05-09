import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import StudyView from '../views/StudyView.vue'
import SettingsView from '../views/SettingsView.vue'
import AddNewCardsView from '../views/AddNewCardsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/study',
      name: 'study',
      component: StudyView
    },
    {
      path: '/daily-new-cards',
      name: 'dailyNewCards',
      component: AddNewCardsView
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView
    },
  ]
})

export default router
