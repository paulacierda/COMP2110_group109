import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';

class MoodWidget extends LitElement {
    static styles = css`
    :host {
        display: block;
        width: 250px;
        height: 250px;
        color: black;
        text-align: center;
    }

    .emoji {
      margin-top: -215px; 
      font-size: 100px; 
      font-family: 'Segoe UI Emoji', 'Apple Color Emoji', 'Noto Color Emoji', 'Twemoji', 'Segoe UI', 'Helvetica Neue', sans-serif;"
    }

    .widgetBackground {
      width: 100%; 
      height: 100%; 
      margin-top: -20px;
    }

    .effect1 {
      position: relative;
      top: -15px;
      left: -80px;
      font-size: 30px;
    }

    .effect2 {
      position: relative;
      top: -35px;
      left: 90px;
      font-size: 30px;
    }

    .effect3 {
      position: relative;
      top: -5px;
      left: -30px;
      font-size: 30px;
    }
  `;

  static properties = {
    _moodColour: {state: true},
    _moodPattern: {state: true},
    tasksToDo: {state: true},
    tasksDoing: {state: true},
    tasksDone: {state: true},
    _emoji: {state: true}
  }

  constructor() {
    super();
    this._moodColour = '';
    this._moodPattern = '';
    this._emoji = '';
    this.tasksToDo = 0;
    this.tasksDoing = 0;
    this.tasksDone = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    TaskModel.loadData();
    window.addEventListener('tasks', () => {
      this.updateMood();
    });
  }
    
  updateMood() {
    // The part to see time related stuff
    const currentTime = new Date();
    const getHours = currentTime.getHours();
    const getWeeks = currentTime.getDay();

    if(getHours >= 6 && getHours < 12){
        // morning
        this._moodColour = 'rgba(230, 223, 68, 0.6), rgba(240, 129, 15, 0.6)';
    } else if(getHours >= 12 && getHours < 18){
        // afternoon
        this._moodColour = 'rgba(240, 129, 15, 0.6), rgba(6, 56, 82, 0.6)';
    } else{
        // everning or error backup
        this._moodColour = 'rgba(6, 56, 82, 0.6), rgba(230, 223, 68, 0.6)';
    }
    // Test gradint in the line below here :D
    // this._moodColour = 'rgba(230, 223, 68, 0.6), rgba(240, 129, 15, 0.6)';

    if(getWeeks >= 1 && getWeeks <= 5){
        // between Monday to Friday
        this._moodPattern = '\u{1F9E1}';
    } else{
        // between Saturday to Sunday or error backup
        this._moodPattern = '\u{1F389}';
    }

    this.tasksToDo = TaskModel.countByCategory("ToDo");
    this.tasksDoing = TaskModel.countByCategory("Doing");
    this.tasksDone = TaskModel.countByCategory("Done");

    if(this.tasksToDo === 0 && this.tasksDoing === 0){
      this._emoji = '\u{1F600}'
    } else if(this.tasksToDo > 0 && this.tasksDone === 0){
      this._emoji = '\u{1F605}'
    } else if(this.tasksToDo === 0 && this.tasksDoing > 0){
      this._emoji = '\u{1F626}'
    } else {
      this._emoji = '\u{1F607}'
    }

    // Just checking values
    //console.log("Mood pattern:", this._moodPattern);
    //console.log("To do: ", this.tasksToDo);
    //console.log("Doing: ", this.tasksDoing);
    //console.log("Done: ", this.tasksDone);
  }

  render() {
    return html`
      <div style="background-image: linear-gradient(${this._moodColour}" class = widgetBackground>
      <p style="font-size: 25px;"><b>Mood Widget</b></p>
      <p class = 'effect1'> ${this._moodPattern} </p>  
      <p class = 'effect2'> ${this._moodPattern} </p> 
      <p class = 'effect3'> ${this._moodPattern} </p> 
      <p class = 'emoji'> ${this._emoji} </p> 
      </div>
    `;
  }
}

customElements.define('mood-widget', MoodWidget);


/**
 * OVERALL PLAN:
 *  
 * __Time of day__
 * Morning = orange
 * Afternoon = yellow
 * Everning = blue
 * 
 * __Day of the week__
 * Mon-Friday = hearts
 * Sat sun = celebrate
 * 
 * __Number of tasks__
 * Everything done/nothing in all category = smilling
 * A lot of things to complete without anything done = sweating
 * Doing tasks all at once without anything left in to to = worried
 * Anything else = angel
 * 
 * Question for my own reference:
 * Mood Widget *: shows different colours and patterns, is affected in some way by the time of day, 
 * day of week and the number of tasks in one or more of the categories  
 * (e.g. bright sparkles on friday when there are no more Todo tasks).
 */