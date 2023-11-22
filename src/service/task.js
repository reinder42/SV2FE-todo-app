export class Task {
    constructor(text, done) {

        // The task text
        this.text = text

        // The task status
        this.done = done

        // Generates a random unique UUID
        this.uuid = crypto.randomUUID()
    }
}