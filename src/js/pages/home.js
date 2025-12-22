import { getCharacters } from "../api/rickApi.js";

let allCharacters = []; // characters in memory

export async function initHome() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
      <h1 class="text-3xl font-bold">Rick & Morty Characters</h1>
      <status-filter></status-filter>
    </div>

    <div 
      id="characters"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
    ></div>
  `;

  const charactersContainer = document.querySelector("#characters");
  const statusFilter = document.querySelector("status-filter");

  try {
    const { results } = await getCharacters();
    allCharacters = results;

    renderCharacters(allCharacters);

    //  Listen filter changes
    statusFilter.addEventListener("status-change", (e) => {
      const status = e.detail;

      if (status === "all") {
        renderCharacters(allCharacters);
      } else {
        const filtered = allCharacters.filter(c => c.status.toLowerCase() === status);
        renderCharacters(filtered);
      }
    });

  } catch (error) {
    console.error(error);
    charactersContainer.innerHTML = `<p>Error loading characters</p>`;
  }
}

// 🔹 función reutilizable para renderizar
function renderCharacters(characters) {
  const charactersContainer = document.querySelector("#characters");

  charactersContainer.innerHTML = characters.map(c => `
    <character-card
      name="${c.name}"
      species="${c.species}"
      image="${c.image}"
      id="${c.id}">
    </character-card>
  `).join("");
}
