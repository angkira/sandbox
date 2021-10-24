"use strict";
class Child extends HTMLElement {
    constructor() {
        super();
        // this.attachShadow({ mode: "open" });
    }
    connectedCallback() {
        const style = document.createElement("style");
        style.textContent = `
          .child {
              width: 100%;
              position: relative;
              padding: 10px;
              background-color: #eeeeee;
              box-shadow: 0 1px 2px rgba(0, 0, 0);
              border-bottom: 2px solid rgb(93, 197, 248);
          }
  
          .title {
              font-size: 20px;
          }
          `;
        this.shadowRoot?.appendChild(style);
        const rootEl = document.createElement("div");
        rootEl.className = "child";
        rootEl.innerHTML = `
                <div class="title">${this.getAttribute("title")}</div>
                <div class="content">${this.getAttribute("content")}</div>`;
        this.appendChild(rootEl);
    }
}
customElements.define("custom-child", Child);
//# sourceMappingURL=Child.js.map