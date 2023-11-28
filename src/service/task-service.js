import { Task } from "./task.js";

/**
 * TaskService
 *
 * Note: TaskService doesn't have a reference to an array with Task objects.
 * The service serves as a pass-through to LocalStorage or any other back-end API.
 * Actions on the back-end storage are taken by either providing a tasks array,
 * or by first fetching the tasks from the back-end (i.e., prior to deleting a task).
 */
export class TaskService {

    constructor() {

        // Constant for local storage key
        this.LOCAL_STORAGE_KEY = '_tasks'
    }

    /**
     * Loads all tasks from local storage
     *
     * @returns {Promise<[Task]>}
     * @private
     */
    _loadAllTasks() {

        // Return a promise
        return new Promise((resolve, reject) => {

            const tasks = window.localStorage.getItem(this.LOCAL_STORAGE_KEY)

            // Check integrity of 'tasks'
            // TODO reject()

            if(tasks == null) {

                // Hard-coded tasks
                resolve([
                    'Remember the milk',
                    'Do the dishes',
                    'Eat pancakes'
                ].map(text => new Task(text, false)))
            } else {

                // Resolve and return array of tasks
                resolve(JSON.parse(tasks))
            }
        });
    }

    /**
     * Get all tasks
     *
     * @returns {Promise<[Task]>}
     */
    getAllTasks() {
        return this._loadAllTasks();
    }

    /**
     * Store tasks in local storage
     *
     * @param tasks
     * @returns {Promise<[Task]>}
     * @private
     */
    _storeAllTasks(tasks) {

        // Return a promise that always resolves
        return new Promise((resolve, reject) => {

            // TODO reject

            // Local storage only stores strings, so we convert from object to string via JSON
            window.localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(tasks))

            // Resolve promise and pass tasks
            resolve(tasks)
        })
    }

    /**
     *
     * Update task text and status based on UUID
     *
     * @param uuid Unique ID of the to-update task
     * @param text Updated task text
     * @param done Updated task status
     *
     * @returns {Promise<[Task]>}
     */
    updateTask(uuid, text, done) {

        // Get all tasks
        this.getAllTasks().then((tasks) => {

            // Loop over all tasks to find the one to update
            tasks.forEach(function (task) {

                // If this is not the task we're looking for
                if (task.uuid !== uuid) {
                    return false
                }

                // Update task text and status
                task.text = text
                task.done = done
            })

            // Invoke storeAllTasks to persist in local storage
            return this._storeAllTasks(tasks)
        })
    }

    /**
     * Add a task
     *
     * @returns {Promise<[Task]>}
     */
    addTask() {

        // Get all tasks
        return this.getAllTasks().then(tasks => {

            // Create new task object
            const task = new Task('', false)

            // Push task object onto tasks array
            tasks.push(task)

            // Invoke storeAllTasks to persist in local storage
            return this._storeAllTasks(tasks)
        })
    }

    /**
     * Remove task by UUID
     *
     * @param uuid UUID of task to remove
     * @returns {Promise<[Task]>}
     */
    removeTask(uuid) {

        // Get all tasks
        return this.getAllTasks().then(tasks => {

            // Remove task by creating a new array without that task, using filter()
            tasks = tasks.filter(task => task.uuid !== uuid)

            // Store new tasks array
            return this._storeAllTasks(tasks)
        })
    }
}