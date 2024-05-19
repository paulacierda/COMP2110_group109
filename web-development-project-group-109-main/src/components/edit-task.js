import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import './task-card.js';

/** EditTask <edit-task id=N>
 * Task edit for a given task id (N).  Displays as a button which when clicked
 * shows a modal dialog containing a form to update the task properties.
 * Submitting the form updates the task via the TaskModel.
 */
class EditTask extends LitElement {
  static properties = {
    id: 0,
    _task: {state: true},
  };

  static styles = css`
        :host {

        }

        #edit-task-dialog {
          border-radius: 20px;
          background-color: rgba(0,0,0,0.7);
        }

        form {
          display: flex;
          flex-direction: column;
          padding: 20px;
          background-color: rgba(255,255,255,0.7);
          color: #DD874C;
          height: 22rem;
          background-image: url('../images/iStock-182488069-modified-29c8e675-6c13-49fb-aac7-1433a5df36b5.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
        }

        form div {
          display: grid;
          grid-template-columns: 1fr 3fr;
          margin: 5px;
          margin-top: 1rem;
          margin-bottom: 1rem;
        }

        input {
          width: 100%;
          margin: 2px;
        }

        #edit-button {
          box-sizing: border-box;
          position: relative;
          bottom: calc(1vmin);
          width: 100px;
          height: 50px;
          font-size: 120%;
          color: white;
          background-image: url('../images/orange-highlight-isolated.png');
          background-color: rgba(255,255,255,0.1);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          border-style: none;
          border-radius: 3px;
        }

        button:hover {
          filter: brightness(1.5);
        }

        form div input {
          width: 15rem;
        }
        form div textarea {
          width: 15rem;
          height: 4rem;
        }

        form div button {
          position: relative;
          top: 1rem;
          padding: 1rem;
          color: white;
          background: 0;
          background-image: url('../images/orange-highlight-isolated.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          border-style: none;
        }

        form div input[type="submit"] {
          position: relative;
          display: inline-block;
          width: 6rem;
          margin: 0 5rem;
          top: 1rem;
          color: white;
          background: 0;
          background-image: url('../images/orange-highlight-isolated.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          border-style: none;
        }

        form input[type='submit']:hover {
          filter: brightness(1.5);
        }
      `;

  connectedCallback() {
    super.connectedCallback();
    this._task = TaskModel.getTask(this.id);
  }

  /**
   * _submit - private method to handle form submission. Constructs
   * a new task from the form values and then updates the task via TaskModel
   * @param {Object} event - the click event
   */
  _submit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const due = new Date(formData.get('due'));
    const newTask = {
      summary: formData.get('summary'),
      text: formData.get('text'),
      priority: formData.get('priority'),
      due: due.valueOf(),
    };
    TaskModel.updateTask(this.id, newTask);
    this._hideModal(event);
  }


  /**
   * click handler for the button to show the editor dialog
   */
  _showModal() {
    const dialog = this.renderRoot.querySelector('#edit-task-dialog');
    dialog.showModal();
  }

  /**
   * click handler to close the editor dialog
   * @param {Object} event - the click event
   */
  _hideModal(event) {
    event.preventDefault();
    const dialog = this.renderRoot.querySelector('#edit-task-dialog');
    dialog.close();
  }

  render() {
    // convert due date from milliseconds time to an ISO string
    // suitable for the datetime-local form input
    const isoString = new Date(this._task.due).toISOString();
    const due = isoString.substring(0, isoString.indexOf('T') + 6);
    return html`
        <button id="edit-button" @click=${this._showModal}>EDIT</button>
        <dialog id="edit-task-dialog">
            <form @submit="${this._submit}">
                <div>
                    <label for="summary">Summary</label>
                    <input name="summary" value=${this._task.summary}>
                </div>
                <div>
                    <label for="text">Text</label>
                    <textarea name="text">${this._task.text}</textarea> 
                </div>
                <div>
                    <label for="priority">Priority</label>
                    <input name="priority" 
                           type="number" 
                           value=${this._task.priority}> 
                </div>
                <div>
                    <label for="due">Due</label>
                    <input name="due" type="datetime-local" value=${due}>
                </div>
                <div>
                    <button @click="${this._hideModal}">Cancel</button>
                    <input value='Update' type=submit>
                </div>
            </form>
        </dialog>`;
  }
}

customElements.define('edit-task', EditTask);
