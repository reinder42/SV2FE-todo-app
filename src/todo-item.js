import { LitElement, css, html } from 'lit'
import { Task } from "./service/task.js";
import { TaskService } from "./service/task-service.js";

export class TodoItem extends LitElement {
    static get properties() {
        return {
            done: { type: Boolean, reflect: true },
            task: { type: String, reflect: true },
            uuid: { type: String, reflect: true }
        }
    }

    constructor() {
        super()

        this.done = false
        this.task = ''
        this.uuid = ''
    }

    render() {
        return html`
            <div>
                <input id="done" type="checkbox" ${this.done ? 'checked' : ''} @click=${this._onClickCheckbox} />
                <input id="task" type="text" @change=${this._onInputFieldChanged} value="${this.task}" />
            </div>
        `
    }

    _onClickCheckbox() {
        this.done = !this.done
        console.log('Task \'' + this.task + '\' is: ' + this.done)

        TaskService.shared.updateTask(this.uuid, this.task, this.done)
    }

    /** Only fired on blur */
    _onInputFieldChanged(event) {
        this.task = event.currentTarget.value

        TaskService.shared.updateTask(this.uuid, this.task, this.done)
    }

    static get styles() {
        return css`
          span {
            padding: 10px;
            box-sizing: border-box;
          }
          
          :host {
            margin-bottom: 10px;
          }
        `
    }
}

window.customElements.define('todo-item', TodoItem)
