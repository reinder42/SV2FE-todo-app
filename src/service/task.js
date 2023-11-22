export class Task {
    constructor(text, done) {
        this.text = text
        this.done = done
        this.uuid = crypto.randomUUID()
        console.log('Created new task with UUID' + this.uuid)
    }
}