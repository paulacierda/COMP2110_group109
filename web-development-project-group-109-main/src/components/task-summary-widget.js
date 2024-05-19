import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';

/**
 * WidgetBlock <widget-block header="Sample Widget">
 * Base example for a widget, used as a placeholder in design for unimplemented
 * widgets
 */
class TaskSummaryWidget extends LitElement {
  static properties = {
    header: {type: String},
    _tasks: {state: true},
  };

  toDoCount;
  doingCount;
  doneCount;
  dueTodayCount;
  highPriorityCount;

  static styles = css`
    :host {
        display: block;
        width: 250px;
        border: 1px solid black;
        background-color: rgba(0, 0, 0, 0.3);
        color: white;
    }

    #summaryContainer {
      margin: 10px;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: space-around;
      align-items: center;
    }
    
    #summaryContainer > div {
      display: inline-block;
      margin: 0;
      padding: 0;
    }

    h4 {
      margin: 0;
    }

    p {
      margin: 10px;
      background-image: url('../images/orange-highlight-isolated.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  `;
  constructor() {
    super();
    // set an event listener to refresh the display when the data is ready
    this._tasks = TaskModel.getTasks(null);
    window.addEventListener('tasks', () => {
      this._loadData();
    });
    this.header = 'Task Summary';
  }

  _loadData() {
    // get the up to date task list
    this._tasks = TaskModel.getTasks(null);
    this.render();
    //console.log(this._tasks);
    this.toDoCount = this.countByCategory("ToDo");
    this.doingCount = this.countByCategory("Doing");
    this.doneCount = this.countByCategory("Done");
    this.dueTodayCount = this.countByToday();
    this.highPriorityCount = this.countHighPriority();
  }

  //The CountByCategory function that was later added to model.js (I kept it here because it was easier to leave it here than to move it)
  countByCategory(category) {
    let count = 0;
    for(let i = 0; i < this._tasks.length; i ++) {
      if(this._tasks[i].category === category) {
        count ++;
      }
    }
    return count;
  }


  //Counts tasks due today
  countByToday() {
    let count = 0;
    let date = new Date();
    let duedate = null;
    for(let i = 0; i < this._tasks.length; i ++) {
      duedate = new Date(this._tasks[i].due);
      if (date.getFullYear() === duedate.getFullYear() &&
                date.getMonth() === duedate.getMonth() &&
                date.getDate() === duedate.getDate()) {
        count ++;
      }
    }
    return count;
  }


  // High Priority tasks are defined as being <= priority 1
  countHighPriority() {
    let count = 0;
    let tasks = this._tasks;
    for(let i = 0; i < tasks.length; i ++) {
      if(tasks[i].priority <= 1) {
        count ++;
      }
    }
    return count;
  }

  render() {
    return html`
      <div class = task-summary>
        <h3>${this.header}</h3>
        <div id = "summaryContainer">
          <div id = "ToDo">
            <h4>To Do</h4>
            <p>${this.toDoCount}</p>
          </div>
          <div id = "Doing">
            <h4>Doing</h4>
            <p>${this.doingCount}</p>
          </div>
          <div id = "Done">
            <h4>Done</h4>
            <p>${this.doneCount}</p>
          </div>
          <div id = "DueToday">
            <h4>Due Today</h4>
            <p>${this.dueTodayCount}</p>
          </div>
          <div id = "HighPriority">
            <h4> High Priority</h4>
            <p>${this.highPriorityCount}</p>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('task-summary-widget', TaskSummaryWidget);
