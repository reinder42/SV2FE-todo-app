import { TodoDashboard } from "./todo-dashboard.js"
import { TodoItem } from "./todo-item.js"
import { TodoList } from "./todo-list.js"
import { Router } from "@vaadin/router"

window.onload = function() {

    const outlet = document.querySelector('#outlet')
    const router = new Router(outlet)

    router.setRoutes([
        { path: '/', component: 'todo-list' },
        { path: '/dashboard', component: 'todo-dashboard' }
    ])
}