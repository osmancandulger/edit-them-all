const template = document.createElement("template");
template.innerHTML = editorsValues1;
import { getEditorsValue, editorsValues1 } from "./index.js";
class contentCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("");
  }
}
window.customElements.define("content-card", contentCard);
