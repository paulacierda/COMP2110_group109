import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import './task-card.js';
import './task-board.js';

class AddTask extends LitElement {
    static properties = {
        id: 0,
        _tasks: {state: true},
        category: {},
      };

    static styles = css`
        :host {
            
        }

        button {
          font-size: 120%;
          color: white;
          background: 0;
          background-image: url('../images/orange-highlight-isolated.png');
          background-repeat: no-repeat;
          background-size: 100% 100%;
          border-style: none;
          border-radius: 3px;
        }
    
        button:hover {
          filter: brightness(1.5);
        }

        #add-task-dialog {
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
        this._tasks = TaskModel.getTasks(this.category);
      }

      /**
       * _submit - private method to handle form submission. Constructs
       * a new task from the form values and then appends it to the server's JSON data via TaskModel
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
            category: this.category,
            due: due.valueOf(),
        };
        TaskModel.addNewTask(newTask);
        this._hideModal(event);
      }
    
      /**
      * click handler for the button to show the add task dialog
      */

      _showModal() {
        const dialog = this.renderRoot.querySelector('#add-task-dialog');
        dialog.showModal();
      }

      /**
       * click handler to close the editor dialog
       * @param {Object} event - the click event
       */

      _hideModal(event) {
        event.preventDefault();
        const dialog = this.renderRoot.querySelector('#add-task-dialog');
        dialog.close();
      }

      render() {
        //convert due date from milliseconds time to an ISO string
        //suitable for the datetime-local form input
        //const isoString = new Date().toISOString();
        //const due = isoString.substring(0, isoString.indexOf('T') + 6);
        return html`
            <button id="add-button" @click=${this._showModal}>ADD</button>
            <dialog id="add-task-dialog">
                <form @submit="${this._submit}">
                    <div>
                        <label for="summary">Summary</label>
                        <input name="summary" value="summary text here">
                    </div>
                    <div>
                        <label for="text">Text</label>
                        <textarea name="text">text description here</textarea> 
                    </div>
                    <div>
                        <label for="priority">Priority</label>
                        <input name="priority" 
                               type="number"value="1">
                    </div>
                    <div>
                        <label for="due">Due</label>
                        <input name="due" type="datetime-local">
                    </div>
                    <div>
                        <button @click="${this._hideModal}">Cancel</button>
                        <input value='Add' type=submit>
                    </div>
                </form>
            </dialog>`;
      }
}

customElements.define('add-task', AddTask);