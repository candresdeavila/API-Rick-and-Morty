export class StatusFilter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.statuses = ["all", "alive", "dead", "unknown"];
    this.active = "all";
  }

  static get observedAttributes() {
    return ["active"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "active") {
      this.active = newValue;
      this.render();
    }
  }

  connectedCallback() {
    this.render();
    this.addEvents();
  }

  addEvents() {
    this.shadowRoot.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      this.active = btn.dataset.status;
      this.render();

      this.dispatchEvent(new CustomEvent("status-change", {
        detail: this.active,
        bubbles: true
      }));
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .filters {
          display: flex;
          gap: 0.5rem;
        }
        button {
          padding: 0.4rem 0.8rem;
          border-radius: 999px;
          border: 1px solid #475569;
          background: #0f172a;
          color: white;
          cursor: pointer;
        }
        button.active {
          background: #22c55e;
          color: black;
          border-color: #22c55e;
        }
      </style>

      <div class="filters">
        ${this.statuses.map(s => `
          <button 
            data-status="${s}"
            class="${this.active === s ? "active" : ""}">
            ${s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        `).join("")}
      </div>
    `;
  }
}

customElements.define("status-filter", StatusFilter);
