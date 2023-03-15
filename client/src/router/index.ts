import { createRouter, createWebHistory } from 'vue-router'
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/faqs', name: 'faqs', component: FAQsView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/profile', name: 'profile', component: ProfileView },
    { path: '/exercises', name: 'exercises', component: ExercisesView },
    { path: '/meals', name: 'meals', component: MealsView },
    { path: '/friends', name: 'friends', component: FriendsView },
    { path: '/user-search', name: 'user-search', component: UserSearchView },
    { path: '/statistics', name: 'statistics', component: StatisticsView },
  ]
})

export default router
