import {LitElement, html, css} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/core/lit-core.min.js';
import {BASE_URL} from '../config.js';

/**
 * AdWidget <ad-widget> displays an advert from the backend server
 */
class AdWidget extends LitElement {
  static properties = {
    adUrl: {type: String},
    visible: {type: Boolean},
  };

  static styles = css`
    :host {
        display: none;
        position: relative;
        width: 250px;
        height: 250px;
        background-color: azure;
        animation-name: fade;
        animation-duration: 2s;
        animation-timing-function: ease-in-out;
    }

    @keyframes fade {
      from {opacity: 0;}
      to {opacity: 1;}
    }

    :host([visible]) {
      display: block;
    }

    :host p {
      position: relative;
      top: -50px;
      text-align: right;
      padding-right: 10px;
      z-index: 0;
      color: white;
    }

    .close-button {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      font-size: 20px;
      color: red;
      opacity: 0.4;
      border: none;
      cursor: pointer;
    }
  `;

  constructor() {
    super();
    this.visible = false;
    this.adUrl = `${BASE_URL}adserver`;
  }

  connectedCallback() {
    super.connectedCallback();
    // set a delay before popping out
    setTimeout(() => {
      this.visible = true;
      this.setAttribute('visible', '');
    }, 5000);
  }

  // function to remove the widget
  closeWidget() {
    this.visible = false; 
    this.removeAttribute('visible');
  }

  render() {
    return html`
    <div>
      <button class="close-button" @click="${this.closeWidget}"><b> X </b></button>
      <img src=${this.adUrl} alt="Advertisement">
      <p>Advertisement</p>
    </div>`
  }
}

customElements.define('ad-widget', AdWidget);