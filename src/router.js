import { createWebHistory, createRouter } from 'vue-router'
import Dashboard from './pages/Dashboard.vue'
import EmployeesList from './pages/EmployeesList.vue'
import Employee from './pages/Employee.vue'

const routes = [
  { path: '/', component: Dashboard },
  { path: '/employees', component: EmployeesList },
  { path: '/employees/:id', component: Employee }
]

export default createRouter({
  routes,
  history: createWebHistory()
})