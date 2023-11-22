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
        // but ya can't, with Lit!
        this.taskService = new TaskService()
    }

    render() {

        // Loop over all tasks with map()
        return this.taskService.getAllTasks().map(function(task) {

            // Construct a todo-item elment ye olde way
            const item = document.createElement('todo-item')
            item.setAttribute('uuid', task.uuid)
            item.setAttribute('task', task.text)
            item.textContent = task.text

            // Only set attribute if task is done (empty attribute)
            if(task.done) {
                item.setAttribute('done', '')
            }

            // Add event listener for custom 'taskupdate' event from <todo-item>
            item.addEventListener('taskupdate', this._onTaskUpdate.bind(this))

            // Return HTML element
            return item

            // 'this' below here is the 2nd parameter of map(f, this)
            // so we can use this inside the map callback function
        }, this)
    }

    /**
     * Event handler for custom 'taskupdate' event
     *
     * @param e Event passed to event handler
     * @private
     */
    _onTaskUpdate(e) {
        this.taskService.updateTask(e.detail.uuid, e.detail.text, e.detail.done)
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
