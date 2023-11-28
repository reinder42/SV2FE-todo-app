import {LitElement, css, html} from 'lit'
import {TodoItem} from "./todo-item.js";
import {TaskService} from "./service/task-service.js";

export class TodoList extends LitElement {
    static get properties() {
        return {
            tasks: { type: Array } // Observe changes to 'tasks' property
        }
    }

    constructor() {
        super()

        // Start with empty array
        this.tasks = []

        // Get a reference to the task service
        // Preferred way to do this: use dependency injection to make dependencies clear!
        this.taskService = new TaskService()

        // Grab tasks from task service
        this.taskService.getAllTasks().then(tasks => this.tasks = tasks)
    }

    render() {

        // Loop over all tasks with map()
        const items = this.tasks.map(function(task) {

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

        // Create button
        const button = document.createElement('button')
        button.textContent = 'Add task'

        // On click, invoke addTask() on taskService
        button.addEventListener('click', this._onAddTask.bind(this))

        // Add button as child element
        items.push(button)

        return items
    }

    /**
     * Event handler for custom 'taskupdate' event
     *
     * @param e Event passed to event handler
     * @private
     */
    _onTaskUpdate(e) {

        // Remove or update task
        if(e.detail.remove === true) {

            // Remove task via service
            this.taskService.removeTask(e.detail.uuid).then((tasks) => {

                // Update tasks property and trigger re-render
                this.tasks = tasks

            }).catch((error) => {
                console.log(error)
            }).finally(() => {
                console.log('Task removed!')
            })

        } else {

            // Update task -- no re-render needed
            this.taskService.updateTask(e.detail.uuid, e.detail.text, e.detail.done).catch((error) => {
                console.log(error)
            }).finally(() => {
                console.log('Task updated!')
            })
        }
    }

    /**
     * Add a new task to the TaskService and manually request that the UI updates
     * @see https://lit.dev/docs/components/properties/#mutating-properties
     *
     * @param e Event
     * @private
     */
    _onAddTask(e) {

        // Add task to service
        this.taskService.addTask().then((tasks) => {

            // Update tasks property and trigger re-render
            this.tasks = tasks

        }).catch((error) => {
            console.log(error)
        }).finally(() => {
            console.log('Task added!')
        })
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
