import { Task } from "./task.js";

export class TaskService {

    constructor() {

        // Constant for local storage key
        this.LOCAL_STORAGE_KEY = '_tasks'

        // Array with task objects
        this.tasks = []

        // Load tasks from storage
        this._loadAllTasks()
    }

    /**
     * Load tasks from storage
     *
     * @private
     */
    _loadAllTasks() {

        const tasks = window.localStorage.getItem(this.LOCAL_STORAGE_KEY)

        // Check integrity of 'tasks'
        // ...

        if(tasks == null) {

            // Hard-coded tasks
            this.tasks = [
                'Remember the milk',
                'Do the dishes',
                'Eat pancakes'
            ].map(text => new Task(text, false))
        } else {

            // Parse from JSON string to JS objects
            this.tasks = JSON.parse(tasks)
        }
    }

    /**
     * Store tasks in local storage
     *
     * @private
     */
    _storeAllTasks() {

        // Local storage only stores strings, so we convert from object to string via JSON
        window.localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(this.tasks))
    }

    /**
     * Returns an array of all tasks
     * @returns Array of Task objects
     */
    getAllTasks() {
        return this.tasks
    }

    /**
     * Update task text and status based on UUID
     *
     * @param uuid Unique ID of the to-update task
     * @param text Updated task text
     * @param done Updated task status
     */
    updateTask(uuid, text, done) {

        // Loop over all tasks to find the one to update
        this.tasks.forEach(function (task) {

            // If this is not the task we're looking for
            if (task.uuid !== uuid) {
                return false
            }

            // Update task text and status
            task.text = text
            task.done = done
        });

        // Store tasks in local storage
        this._storeAllTasks()
    }

    /**
     * Add a task
     */
    addTask() {
        // Create new task object
        const task = new Task('', false)

        // Push task object onto tasks array
        this.tasks.push(task)

        // Invoke storeAllTasks to persist in local storage
        this._storeAllTasks()
    }

    /**
     * Remove task by UUID
     *
     * @param uuid UUID of task to remove
     */
    removeTask(uuid) {

        // Remove task by creating a new array without that task, using filter()
        this.tasks = this.tasks.filter(task => task.uuid !== uuid)

        // Invoke storeAllTasks to persist in local storage
        this._storeAllTasks()
    }
}