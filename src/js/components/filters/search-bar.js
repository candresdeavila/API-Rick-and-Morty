export class SearchBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get observedAttributes() {
    return ["value"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value" && this.shadowRoot) {
      const input = this.shadowRoot.querySelector("input");
      if (input && input.value !== newValue) {
        input.value = newValue || "";
      }
    }
  }

  connectedCallback() {
    this.render();
    this.addEvents();

    // valor inicial
    const initialValue = this.getAttribute("value") || "";
    this.shadowRoot.querySelector("input").value = initialValue;
  }

  addEvents() {
    const input = this.shadowRoot.querySelector("input");

    input.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();

      this.dispatchEvent(new CustomEvent("search-change", {
        detail: value,
        bubbles: true
      }));
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        input {
          width: 100%;
          max-width: 260px;
          padding: 0.5rem 0.6rem;
          border-radius: 0.75rem;
          border: 1px solid #475569;
          background: #0f172a;
          color: white;
          outline: none;
        }

        input::placeholder {
          color: #94a3b8;
        }

        input:focus {
          border-color: #22c55e;
        }
      </style>

      <input 
        type="text"
        placeholder="Search character..."
      />
    `;
  }
}

customElements.define("search-bar", SearchBar);
