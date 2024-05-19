import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import './task-card.js';

/** EditTask <edit-task id=N>
 * Task edit for a given task id (N).  Displays as a button which when clicked
 * shows a modal dialog containing a form to update the task properties.
 * Submitting the form updates the task via the TaskModel.
 */
class DeleteTask extends LitElement {
  static properties = {
    id: 0,
    _task: {state: true},
  };

  static styles = css`
        :host {

        }

        #delete-button {
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
      `;

  connectedCallback() {
    super.connectedCallback();
    this._task = TaskModel.getTask(this.id);
  }

  /**
   * _submit - private method to handle button click
   * @param {Object} event - the click event
   */
  _submit(event) {
    TaskModel.deleteTask(this.id);
  }

  render() {
    
    return html`
        <button id="delete-button" @click=${this._submit}>DELETE</button>
        
        
      `;
  }
}

customElements.define('delete-task', DeleteTask);
