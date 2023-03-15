import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'
import { useSession } from '../model/session'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import FAQsView from '../views/FAQsView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ProfileView from '../views/ProfileView.vue'
import ExercisesView from '../views/ExercisesView.vue'
import MealsView from '../views/MealsView.vue'
import FriendsView from '../views/FriendsView.vue'
import UserSearchView from '../views/UserSearchView.vue'
import StatisticsView from '../views/StatisticsView.vue'

// Site router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/faqs', name: 'faqs', component: FAQsView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/profile', name: 'profile', component: ProfileView, beforeEnter: (secureRoute) },
    { path: '/exercises', name: 'exercises', component: ExercisesView, beforeEnter: (secureRoute) },
    { path: '/meals', name: 'meals', component: MealsView, beforeEnter: (secureRoute) },
    { path: '/friends', name: 'friends', component: FriendsView, beforeEnter: (secureRoute) },
    { path: '/user-search', name: 'user-search', component: UserSearchView },
    { path: '/statistics', name: 'statistics', component: StatisticsView, beforeEnter: (secureRoute) },
  ]
})

export default router

// Function to only allow access to certain pages if a user is logged in
function secureRoute (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) {
  const session = useSession();
  if (session.user) {
      next()
  } else { 
      next('/login')
  }
}
