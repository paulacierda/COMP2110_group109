import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {TaskModel} from '../models.js';

/**
 * CalendarWidget <calendar-widget> display a calendar in the widget area
 * 
 * Use of Generative AI
 * 
 * I have used AI in creating the calendar widget. I have initially tried creating the widget first without the use of AI.
 * It started by looking for some tips on how create a calendar widget by Javascript. As I have struggle on making some of the function work properly that is when I have used AI. 
 * The way I used AI is that I asked on how to correctly write the function/code and also what are the mistakes that I have made.
 * The AI that I have used is ChatGPT. The value that gave me for using ChatGPT is the workflow has been better. Which made more time to think on what needs to be added on the calendar widget than doing a trial and error on codes that I wring incorrectly and also by having a much more orgnanise in writing the code.
 * The use of generative AI is justified as I am also learning the way the code should be written as every code that ChatGPT has given I analyse and study. 
 * 
 */
class CalendarWidget extends LitElement {
    static properties = {
       currentDate: {type: Date},
    };

    
    static styles =css`
    :host {
      display: block;
      width: 250px;
      height: 250px;
      font-family: Tahoma, Verdana, sans-serif;
    }
    header{
      margin: 2px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px;
    }

    .calendar {
      display: grid;
      grid-template-rows: auto auto;
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
      background-color: rgba(0, 0, 0, 0.3);
      width:250px;
      height: 247px;
    }

    h2{
      font-size: 16px;
      color: white;
    }

    .days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      grid-auto-rows: 27px;
      width:250px;
      font-size:15px;
      height: auto;
      margin: 0px 2px;
    }

    .day {
      text-align: center;
      padding: 1px;
      margin: 1px;
      font-weight: bold;
      background-color: rgba(255, 255, 255, 0.8);
      border-radius: 5px;
    }

    button {
      margin: 5px;
      padding: 5px 10px;
      background: 0;
      color: orange;
      border: none;
      cursor: pointer;
    }

    .current-date{
      color:white;
      background: 0;
      display: flex;
      justify-content: center;
      background-image: url('../images/orange-highlight-isolated.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .day.has-task {
      background-color: rgba(255, 10, 10, 0.5);
    }

    .day:hover {
      background-color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
    }

    .dayprev-month{
      color: #adadaa;
      opacity: 0.7;
      padding: 1px;
      margin: 1px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      cursor: pointer;
    }
    .dayprev-month:hover {
      background-color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
    }

    .daynext-month{
      color: #adadaa;
      opacity: 0.7;
      padding: 1px;
      margin: 1px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      cursor: pointer;
    }
    .daynext-month:hover {
      background-color: rgba(255, 255, 255, 0.5);
      cursor: pointer;
    }
  `;
    constructor() {
            super();
            this.currentDate = new Date();
      }         

    
    render() {
        const month = this.currentDate.toLocaleString('default', { month: 'long' }); //get the current month
        const year = this.currentDate.getFullYear(); //get the current year
        const daysInMonth = new Date(year, this.currentDate.getMonth() + 1, 0).getDate(); //get the number of days in a month
        let firstDayIndex = new Date(year, this.currentDate.getMonth(), 1).getDay(); //get the first day of the week
        firstDayIndex = (firstDayIndex === 0) ? 6 : firstDayIndex - 1; //to make Monday the first day of the week


        const days = [];
        // add  the last previous days of the month before the first day of the month
        for (let i = 0; i < firstDayIndex; i++) {
          const prevMonthDays = new Date(year, this.currentDate.getMonth(), -i).getDate(); 
        days.unshift(html`<div class="dayprev-month" @mouseover="${() => this.DateHover(prevMonthDays)}">${prevMonthDays}</div>`); //unshift() is a method that adds new elemement from the beginning of the array
        }
      
        // add days of the month
        for (let i = 1; i <= daysInMonth; i++) {
          const currentDate = new Date(year, this.currentDate.getMonth(), i); //get the current date
          const hasTasks = TaskModel.getTasksForDay(currentDate).length > 0; 

          //to check whether if today is the current date
          const isCurrentDate = currentDate.getFullYear() === new Date().getFullYear() 
            && currentDate.getMonth() === new Date().getMonth()
            && currentDate.getDate() === new Date().getDate();

          const className = `day ${isCurrentDate ? 'current-date' : ''} ${hasTasks ? 'has-task' : ''}`;//highlight the days that has a task due
          days.push(html`<div class=" ${className}" @mouseover="${() => this.DateHover(i)}">${i}</div>`); 
        }

        // add the next few days from the next month
        const totalDays = days.length;
        const remainingDays = 42 - totalDays; // 6 weeks * 7 days
        for (let i = 1; i <= remainingDays; i++) {
          days.push(html`<div class="daynext-month" @mouseover="${() => this.DateHover(i)}">${i}</div>`);
        }

        return html`
          <div class="calendar">
            <div>
              <header>
                <button @click="${this.previousMonth}"><<</button><h2>${month} ${year}</h2><button @click="${this.nextMonth}">>></button>
              </header>
              <div class="days">
                <div class="day">Mon</div>
                <div class="day">Tue</div>
                <div class="day">Wed</div>
                <div class="day">Thu</div>
                <div class="day">Fri</div>
                <div class="day">Sat</div>
                <div class="day">Sun</div>
                ${days} 
              </div>
            </div>
           </div>
        `;
      }
      //go to the previous month
      previousMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
        this.requestUpdate();
      } 
      //go to the next month
      nextMonth() {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
        this.requestUpdate();
    
     }
      //when hover able to highligh the day that the mouse is currently on
      DateHover(day) {
        console.log(`Hovered over the day ${day}`);

      } 
}
    
    customElements.define('calendar-widget', CalendarWidget);