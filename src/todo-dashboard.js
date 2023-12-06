import { LitElement, css, html } from 'lit'
import {TaskService} from "./service/task-service.js";

export class TodoDashboard extends LitElement {

    static get properties() {
        return {
            numberOfTasks: { type: Number },
            completedTasks: { type: Number }
        }
    }

    constructor() {
        super()

        // Initialize properties
        this.numberOfTasks = 0
        this.completedTasks = 0

        // Get a reference to task service
        this.taskService = new TaskService()

        // Grab tasks from service and calculate totals
        this.taskService.getAllTasks().then((tasks) => {
            this.numberOfTasks  = tasks.length
            this.completedTasks = tasks.filter(t => t.done).length
        })
    }

    render() {
        return html`
            <span>No. task: ${this.numberOfTasks}</span><br />
            <span>No. completed: ${this.completedTasks}</span>
        `
    }

    static get styles() {
        return css` 
            :host {
                margin: 10px;
            }
        `
    }
}

window.customElements.define('todo-dashboard', TodoDashboard)