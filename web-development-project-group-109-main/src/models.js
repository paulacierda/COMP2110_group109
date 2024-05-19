// Models provide access to data for the application
//
// This module exports a single object TaskModel that is an instance
// of the Task class and can be used to access stored and remote
// data for the application.
import {BASE_URL} from './config.js';
import {getUser} from './auth.js';

class Task {
  constructor() {
    this._tasks = {};

    // when we get a user event (new user login/logout), load task data
    // and trigger a refresh
    window.addEventListener('user', () => {
      this.loadData();
    });
  }

  /**
   * loadData - load data from the remote API and store
   *  locally for use by the application. Call when user
   *  logs in or whenever an update from the server is
   *  suggested.
   */
  loadData() {
    const URL = `${BASE_URL}tasks?count=100`;
    const user = getUser();
    if (user) {
      this._message = undefined;
      fetch(URL, {
        method: "GET",
        headers: {
          Authorization: 'basic ' + user.token,
        },
      })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            this._storeData(data.tasks);
          })
          .catch((error) => {
            console.log(error);
          });
    } else {
      // no user so forget whatever we knew
      this._tasks = {};
      this._updateEvent();
    }
  }

  /**
   * _storeData - private method to store an array of tasks
   * @param {Array} tasks - an array of tasks
   */
  _storeData(tasks) {
    this._tasks = {};
    tasks.map((task) => {
      if (task.category in this._tasks) {
        this._tasks[task.category].push(task);
      } else {
        this._tasks[task.category] = [task];
      }
    });
    this._updateEvent();
  }

  /**
   * _updateEvent - private method to dispatch
   * a 'task' event on the global window when task data changes
   */
  _updateEvent() {
    // send out an update event
    const event = new CustomEvent('tasks');
    window.dispatchEvent(event);
  }

  /**
   * Get tasks, if category is not null, get tasks in that
   * category, otherwise get all tasks
   * @param {string} category
   * @return {Array}
   */
  getTasks(category=null) {
    if (category) {
      return this._tasks[category] || [];
    } else {
      const allTasks = [];
      for (const cat in this._tasks) {
        allTasks.push(...this._tasks[cat]);
      }
      return allTasks;
    }
  }

  /**
   * Add to task array, given an array of tasks, add a task to the end of the array
   * and return the new array
   * @param {Array} tasks - an array of tasks
   * @param {Task} thisTask - current task to be added to array
   */
  addToArray(thisTask, tasks) {
    tasks.push(thisTask);
    return tasks;
  }

  /**
   * get the details of a single task from the `id`
   * @param {number} id
   * @return {Object} the task
   */
  getTask(id) {
    for (const category in this._tasks) {
      for (const task of this._tasks[category]) {
        // need a == comparison here in case id is a string
        if (task.id == id) {
          return task;
        }
      }
    }
    return null;
  }

  /**
   * Get all tasks for the given date
   * @param {Date} date
   * @return {Array}
   */
  getTasksForDay(date) {
    const tasks = this.getTasks();
    const result = [];
    for (let i=0; i<tasks.length; i++) {
      const duedate = new Date(tasks[i].due);
      // are these the same day?
      if (date.getFullYear() === duedate.getFullYear() &&
                date.getMonth() === duedate.getMonth() &&
                date.getDate() === duedate.getDate()) {
        result.push(tasks[i]);
      }
    }
    return result;
  }

  /**
   * Update a task, given its id.  Sends an update request to the
   * server and then refreshes the local task store (async)
   * A 'task' event will be broadcast when the new data is loaded
   * @param {number} id
   * @param {Object} newTask
   */
  updateTask(id, newTask) {
    const existingTask = this.getTask(id);
    const URL = `${BASE_URL}tasks/${id}`;
    const user = getUser();
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'basic ' + user.token,
      },
      body: JSON.stringify({...existingTask, ...newTask}),
    } )
        .then((response) => response.json())
        .then((data) => {
          this.loadData();
        });
  }

  /**
   * fetch the tasks on the server and log them (this is now not used but you could use it)
   */
  checkTasks() {
    const URL = `${BASE_URL}tasks`;
    const user = getUser();
    console.log(URL);
    fetch(URL, {
      headers: {
        Authorization: 'basic ' + user.token,
      }
    })
    .then((response) => {
      console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
  }

    /**
   * Add a new task with a randomised id. Sends an update request to the
   * server and then refreshes the local task store (async)
   * a 'task' event will be broadcast when the new data is loaded
   * @param {Object} newTask 
   */
  addNewTask(newTask) {
    //this.checkTasks();
    const URL = `${BASE_URL}tasks`;
    const user = getUser();
    fetch(URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'basic ' + user.token,
      },
      body: JSON.stringify(newTask),
    } )
    .then((response) => response.json)
    .then((data) => {
      this.loadData();
    });
    //this.checkTasks();
  }


  /**
   * Delete a task with a certain id. Sends a delete request to the server
   * and then refreshes the local task store (async)
   * a 'task' event will be broadcast when the new data is loaded
   * @param {number} id 
   */
  deleteTask(id) {
    const URL = `${BASE_URL}tasks/${id}`;
    const user = getUser();
    fetch(URL, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'basic ' + user.token,
      },
    } )
      .then(response => response.json)
      .then((data) => {
        this.loadData();
      })
  }

  // Count tasks by category
  countByCategory(category) {
    let count = 0;
    let temp = this.getTasks(null);
    for(let i = 0; i < temp.length; i ++) {
      if(temp[i].category === category) {
        count ++;
      }
    }
    return count;
  }
}

// Export an instance of the task object (singleton) where other modules can
// then use it to issue requests
export const TaskModel = new Task();
