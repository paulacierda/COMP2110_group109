import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import './task-card.js';
import './add-task.js';

/**
 * TaskBoard <task-board category="XXX">
 * Display tasks in the given category
 */
class TaskBoard extends LitElement {
  static properties = {
    category: {},
    _tasks: {state: true},
    _message: {state: true},
  };

  static styles = css`
    :host {
        display: flex;
        background-color: #37373770;
        color: white;
        border: 1px solid #FFCCFF;
        padding: 10px;
        margin: 20px;
        width: 350px;
        height: 85vh;
        border-radius: 25px;
        justify-content: center;
        overflow-y: scroll;
    }
    :host input {
        width: 5em;
    }
    .task-actions {
      display: block;
    }
    .task-actions li {
      display: inline-block;
    }

    h3 {
      margin: 1rem auto;
      width: 6rem;
      background-image: url('../images/orange-highlight-isolated.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  `;

  constructor() {
    super();
    // set an event listener to refresh the display when the data is ready
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  _loadData() {
    // get the up to date task list
    this._tasks = TaskModel.getTasks(this.category);
    this.render();
  }

  render() {
    if (this._message) {
      return html`<h3>${this.category}</h3> <p>${this._message}</p>`;
    } else if (this._tasks) {
      return html`
          <div>
            <h3>${this.category}</h3>
            <add-task category="${this.category}"></add-task>

            <div class="card-list">
              ${this._tasks.map((task) => {
                  return html`<task-card id=${task.id}></task-card>`;
                })}
            </div>
          </div>
        `;
    } else {
      return html`<h3>${this.category}</h3><p>Loading....</p>`;
    }
  }
}

customElements.define('task-board', TaskBoard);
