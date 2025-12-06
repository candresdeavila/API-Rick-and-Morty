export class CharacterCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const name = this.getAttribute("name");
    const species = this.getAttribute("species");
    const image = this.getAttribute("image");

    this.shadowRoot.innerHTML = `
      <style>
        .card {
          background: #1e293b;
          padding: 1rem;
          border-radius: 0.75rem;
          box-shadow: 0 4px 8px rgb(0 0 0 / 0.3);
          transition: transform 0.2s;
        }
        .card:hover {
          transform: scale(1.05);
        }
        img {
          width: 100%;
          border-radius: 0.75rem;
          margin-bottom: 0.5rem;
          display: block;
        }
        h2 {
          font-size: 1.2rem;
          margin: 0;
          color: white;
        }
        p {
          margin: 0;
          color: #cbd5e1;
        }
      </style>

      <div class="card">
        <img src="${image}" alt="${name}" />
        <h2>${name}</h2>
        <p>${species}</p>
      </div>
    `;
  }
}
