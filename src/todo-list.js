import {LitElement, css, html} from 'lit'
import {TodoItem} from "./todo-item.js";
import {TaskService} from "./service/task-service.js";

export class TodoList extends LitElement {
    static get properties() {
        return {}
    }

    constructor() {
        super()

        // It's better to use dependency injection for taskService
        this.taskService = new TaskService()
    }

    render() {
        return this.taskService.getAllTasks().map(task => html`
            <todo-item ${task.done ? 'done' : ''} uuid="${task.uuid}" task="${task.text}">${task.text}</todo-item>`)
    }

    static get styles() {
        return css`
          :host {
            padding: 20px;
          }
        `
    }
}

window.customElements.define('todo-list', TodoList)
