import { getCharacters } from "../api/rickApi.js";

export async function initHome() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <h1 class="text-3xl font-bold mb-6">Rick & Morty Characters</h1>
    <div 
      id="characters"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
    ></div>
  `;

  const charactersContainer = document.querySelector("#characters");

  try {
    const { results } = await getCharacters();

    charactersContainer.innerHTML = results.map(c => `
      <character-card
        name="${c.name}"
        species="${c.species}"
        image="${c.image}"
        id="${c.id}">
      </character-card>
    `).join("");

  } catch (error) {
    console.error(error);
    charactersContainer.innerHTML = `<p>Error loading characters</p>`;
  }
}
