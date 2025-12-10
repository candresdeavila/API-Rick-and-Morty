class CharacterDetail extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    const id = this.getAttribute("id");
    const data = await this.getCharacter(id);
    this.render(data);
  }

  async getCharacter(id) {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    return await res.json();
  }

  render(c) {
    this.shadowRoot.innerHTML = `
      <style>
        .detail {
          max-width: 500px;
          margin: 40px auto;
          padding: 20px;
          border-radius: 12px;
          background: #222;
          color: white;
        }
        img {
          width: 100%;
          border-radius: 12px;
        }
        button {
          margin-top: 20px;
          padding: 8px 16px;
          background: #4ade80;
          color: black;
          font-weight: bold;
          border-radius: 8px;
          cursor: pointer;
        }
      </style>

      <div class="detail">
        <img src="${c.image}" alt="${c.name}">
        <h2>${c.name}</h2>
        <p><strong>Status:</strong> ${c.status}</p>
        <p><strong>Species:</strong> ${c.species}</p>
        <p><strong>Gender:</strong> ${c.gender}</p>
        <p><strong>Origin:</strong> ${c.origin.name}</p>
        <button id="back">Back</button>
      </div>
    `;

    this.shadowRoot.querySelector("#back").addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("go-back", { bubbles: true }));
    });
  }
}

customElements.define("character-detail", CharacterDetail);
