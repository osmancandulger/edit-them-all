import { getEditorsValue, htmlEditorValue } from "./index.js";
// const contentTemplate = document.createElement("template");
var contentTemplate = document.createElement("template");
class contentCard extends HTMLElement {
  constructor() {
    super();
    var asd = "";
    // let shadow = this.attachShadow({ mode: "open" });
    this.attachShadow({ mode: "open" }).appendChild(
      contentTemplate.content.cloneNode(true)
    );
    // contentTemplate.innerHTML = "<i>asd</i>";
    // this.attachShadow({ mode: "open" }).appendChild(
    //   contentTemplate.content.cloneNode(true)
    // );

    // this.shadowRoot.appendChild(contentTemplate.content.cloneNode(true));
    document.addEventListener(
      "keydown",
      function (e) {
        if (
          (window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey) &&
          e.keyCode == 83
        ) {
          e.preventDefault();

          // console.log(this.getAttribute("html"));
          // contentTemplate.innerHTML = this.getAttribute("html");
          // this.shadowRoot.querySelector("template").innerHTML =
          //   this.getAttribute("html");
        }
      },
      false
    );
  }
  static get observedAttributes() {
    return ["html"];
  }
  attributeChangedCallback(name, oldVal, newVal) {
    // switch (name) {
    //   case "html":
    //     shadow.innerHTML = newVal;
    //     setTimeout(function () {
    //       console.warn(contentTemplate);
    //       console.log(contentTemplate);
    //     }, 500);
    //     console.log(`Value changed from ${oldVal} to ${newVal}`);
    //     break;
    //   case "css":
    //     console.log(`Value changed from ${oldVal} to ${newVal}`);
    //   case "javascript":
    //     console.log(`Value changed from ${oldVal} to ${newVal}`);

    //     break;
    // }

    if (oldVal !== newVal) {
      this.asd = newVal;
      contentTemplate.innerHTML = this.asd;
      var contentCard = document.querySelector("content-card");
      contentCard.querySelector("#shadow-root").appendChild(newVal);
    }
  }
  connectedCallback() {
    console.error("connectedCallback");
  }
}
window.customElements.define("content-card", contentCard);
