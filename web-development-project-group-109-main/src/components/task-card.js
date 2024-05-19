import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';
import './edit-task.js';
import './delete-task.js';

/**
 * TaskCard <task-card id=N>
 * Display the details of the task with id N in a 'card'
 * as part of the task board
 */
class TaskCard extends LitElement {
  static properties = {
    id: 0,
    _task: {state: true},
    _fullText: {String, state: true},
    _abbreveText: {String, state: true},
    _currentText: {String, state: true},
    _expanded: {Boolean, state: true},
  };

  

  static styles = css`
  
    :host {
      position: relative;
      display: flex;
      width: 100%;
      color: #DD874C;
    }
    :host::before {
      content: "";
      background-image: url('../images/iStock-182488069-modified-29c8e675-6c13-49fb-aac7-1433a5df36b5.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      border: 2px solid #e8e1d7;
      border-radius: 25px;
      position: absolute;
      top: 0px;
      right: 0px;
      bottom: 0px;
      left: 0px;
      opacity: 0.75;
    }
    :host:hover {
      filter: brightness(1.5);
    }
    :host input {
      width: 5em;
    }
    h2 {
      position: relative;
      font-size: 1.4rem;
      font-variant: small-caps;
      display: inline-block;
      padding: 0 1.5rem;
      margin: 0;
      background-image: url('../images/orange-highlight-isolated.png');
      background-color: rgba(0,0,0,0.1);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      color: white;
    }
    p {
      position: relative;
      margin-right: 1.5rem;
      margin-left: 1.5rem;
    }
    .task-priority { 
      position: relative;
      background-position: top;
      color: white;
      font-size: calc(20px + 0.5vmin);
    }
    .task-content {
      position: relative;
      margin-bottom: 5rem;
      cursor: pointer;
    }
    .task-content:hover {
      filter: brightness(1.5);
    }
  `;
  //gets the details of this task based off its id and uses a couple variables to store its text
  //and display only a brief text description if needed.
  connectedCallback() {
    super.connectedCallback();
    this._task = TaskModel.getTask(this.id);
    this._fullText = this._task.text.toString();
    if (this._fullText.length > 64) {
          this._abbreveText = this._briefDescription(this._fullText);
    } else {
      this._abbreveText = this._fullText;
    }
    this._expanded = false;
    this._currentText = this._abbreveText;
    this._loadData();
    window.addEventListener('tasks', () => {
      this._loadData();
    });
  }

  /**
   * This function never actually gets called but it might be useful. Updates the fulltext variable
   * with the task's text in case it's changed
   */
  updateFullText() {
    this._fullText = this._task.text;
  }
  /** 
   * This function refreshes the values and then re-renders. It shouldn't
   * actually be here, because we want connectedCallback() to be in charge of updating
   * the tasks whenever they are changed, but keeping this here means
   * edit task updates as the user hits submit. If we could have gotten add and delete
   * to reflect upon submitting their forms, this function would do little if at all.
  */
  _loadData() {
    this._task = TaskModel.getTask(this.id);
    this._fullText = this._task.text.toString();
    if (this._fullText.length > 64) {
          this._abbreveText = this._briefDescription(this._fullText);
    } else {
      this._abbreveText = this._fullText;
    }
    this._expanded = false;
    this._currentText = this._abbreveText;
    this.render();
  }
/**
 * @param {*} text 
 * @returns input text converted to a substring of itself 60 characters long
 */
  _briefDescription(text) {
    let abbreviatedText = new String(text.substring(0,60));
    return abbreviatedText + "...";
  }
  /**
   * Manipulates task text to show the full version on user click
   */
  _swapDetail(e) {
    if (this._expanded == false) {
      this._currentText = this._fullText;
      this._expanded = true;
    } else {
      this._currentText = this._abbreveText;
      this._expanded = false;
    }
  }

  render() {
    if (this._task) {
      const ts = new Date(parseInt(this._task.timestamp));
      const due = new Date(parseInt(this._task.due));
      return html`
      <div>
        <p class='task-priority'>${this._task.priority}</p>
        <h2>${this._task.summary}</h2>
        <p class='task-timestamp'><b>Created: </b>${ts.toDateString()}</p>
        <p class='task-due'><b>Due: </b>${due.toDateString()}</p>
        <p id = "content" class='task-content' @click=${this._swapDetail}>${this._currentText}</p>

        <edit-task id=${this.id}></edit-task>
        <delete-task id=${this.id}></delete-task>
      </div>
      `;
    } else {
      return html`<div>Loading...</div>`;
    }
  }


}
customElements.define('task-card', TaskCard);
