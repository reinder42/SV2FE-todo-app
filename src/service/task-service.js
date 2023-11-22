import { Task } from "./task.js";

export class TaskService {

    constructor() {

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

        // Hard-coded tasks
        this.tasks = [
            'Remember the milk',
            'Do the dishes',
            'Eat pancakes'
        ].map(text => new Task(text, false))
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
    }
}