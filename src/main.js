import { TodoDashboard } from "./todo-dashboard.js"
import { TodoItem } from "./todo-item.js"
import { TodoList } from "./todo-list.js"
import { Router } from "@vaadin/router"
import { defineConfig } from 'vite'

export default defineConfig({
    base: '/SV2FE-todo-app/'
})

// all your base are belong to us
const BASE = import.meta.env.BASE_URL ?? '/'

window.onload = function() {

    const outlet = document.querySelector('#outlet')
    const router = new Router(outlet)

    router.setRoutes([
        { path: `${BASE}`, component: 'todo-list' },
        { path: `${BASE}/dashboard`, component: 'todo-dashboard' }
    ])
}