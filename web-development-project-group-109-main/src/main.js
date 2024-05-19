import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import './components/widget-block.js';
import './components/blog-block.js';
import './components/widget-container.js';
import './components/ad-widget.js';
import './components/login-widget.js';
import './components/task-manager.js';
import './components/task-summary-widget.js';
import './components/calendar-widget.js';
import './components/bmi-widget.js';
import './components/mood-widget.js';

/**
 * Comp2110TaskManager component constructs the main UI of the application
 */
class Comp2110TaskManager extends LitElement {
  static properties = {
    header: {type: String},
  };

  static styles = css`

    :host {
      min-height: 100vh;
      font-size: 14pt;
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      background-color: var(--comp2110-portal-background-color);
      font-family: Verdana, Geneva, Tahoma, sans-serif;
    }

    header {
      background-image: url('../images/iStock-1652567664.jpg');
      background-size: cover;
      box-shadow: 5px 5px;
      width: 100%;
      height: 30px;
      z-index: 1;
      padding: 10px 10px 15px;
      display: flex;
      justify-content: space-between;
      clear: both;
    }
    h1{
      font-size: 30px;
      margin-top: auto;
      text-align: center;
    }

    login-widget{
      display: inline-flex;
      align-items: center;
      margin-right: 50px;
      margin-top: 25px
    }

    ad-widget {
      position: fixed;
      left: 0; 
      right: 0;
      bottom: 0;
      top: 0;
      margin: auto;
    }

    main {
      display: flex;
      justify-content: space-between;
      background-image: url('../images/iStock-1004928840.jpg');
      background-size: cover;
      background-attachment: fixed;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
      padding: 18px;
      margin: 0px;
      float: none;
    }

    p {
      background-image: url('../images/iStock-1652567664.jpg');
    }

    .app-footer a {
      margin-left: 5px;
    }

  `;

  constructor() {
    super();
    this.header = 'COMP2110 Task Manager';
  }

  render() {
    return html`
      <header>
      <h1> <img src="favicon.ico" alt="2110 Icon" width="25" height="25">${this.header}</h1>
        <login-widget></login-widget>
      </header>

      <main>      
        <task-manager></task-manager>     
        <ad-widget></ad-widget>
        <widget-container header="Widgets">
          <calendar-widget></calendar-widget>
          <task-summary-widget></task-summary-widget>
          <mood-widget></mood-widget>
        </widget-container>
      </main>

      <p class="app-footer">
        🚽 Made with love by
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/open-wc"
          >open-wc</a
        >.
      </p>
    `;
  }
}

customElements.define('comp2110-task-manager', Comp2110TaskManager);

/*
 *Shelved for now
 *<bmi-widget></bmi-widget>
 *<ad-widget></ad-widget>
*/