import { LitElement, css, html } from 'lit'
import { Task } from "./service/task.js";
import { TaskService } from "./service/task-service.js";

export class TodoItem extends LitElement {

    /**
     * Properties (reflected to attributes)
     * Please note that the properties of the Task class have
     * been deconstructed here, so we can map them to HTML element
     * attributes. This is not necessary; we could have used an Object
     * property with custom convertor. That way, the 3 properties would
     * have been kept inside the component and not been exposed via HTML
     * attributes.
     *
     * @returns Properties
     */
    static get properties() {
        return {
            done: { type: Boolean, reflect: true }, // Task status
            task: { type: String, reflect: true },  // Task text
            uuid: { type: String, reflect: true }   // Task unique ID
        }
    }

    constructor() {
        super()

        this.done = false
        this.task = ''
        this.uuid = ''
    }

    render() {
        // The .checked REALLY makes a difference here, @see https://stackoverflow.com/a/55994717
        return html`
            <div>
                <input id="done" type="checkbox" .checked="${this.done}" @click=${this._onClickCheckbox} />
                <input id="task" type="text" value="${this.task}" @change=${this._onInputFieldChanged}  />
            </div>
        `
    }

    /**
     * Click event handler for checkbox
     * @private
     */
    _onClickCheckbox() {

        // Toggle done property true <=> false
        this.done = !this.done

        // Dispatch custom 'taskupdate' event
        this._dispatchUpdateEvent()
    }

    /**
     * Change event handler for <input> element.
     * Please note that this only fires on blur
     * and change, so not for every keypress.
     *
     * @param e Event passed to handler
     * @private
     */
    _onInputFieldChanged(e) {

        // Update task property with 'value' from <input>
        this.task = e.currentTarget.value

        // Dispatch custom 'taskupdate' event
        this._dispatchUpdateEvent()
    }

    /**
     * Dispatch a custom 'taskupdate' event to listeners,
     * which includes a detail object with the task UUID,
     * text and 'done' status. Listening for this event
     * in a parent <todo-list> element allows it to update
     * the task's data in some (backend) storage.
     *
     * @private
     */
    _dispatchUpdateEvent() {

        // Construct custom event
        const update = new CustomEvent('taskupdate', {
            bubbles: true,       // Must bubble
            cancelable: false,   // Not necessary
            composed: true,      // Must be able to cross shadow barrier
            detail: {
                uuid: this.uuid, // Unique ID
                done: this.done, // Task status
                text: this.task  // Task text
            }
        });

        // Bombs away!
        this.dispatchEvent(update)
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
