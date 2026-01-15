import { getCharacters } from "../api/rickApi.js";

const CHARACTERS_KEY = "rm-characters";
const STATUS_KEY = "rm-status";

let allCharacters = [];

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
    // 🔹 1. Cargar personajes desde localStorage o API
    const storedCharacters = localStorage.getItem(CHARACTERS_KEY);

    if (storedCharacters) {
      allCharacters = JSON.parse(storedCharacters);
    } else {
      const { results } = await getCharacters();
      allCharacters = results;
      localStorage.setItem(CHARACTERS_KEY, JSON.stringify(allCharacters));
    }

    // 🔹 2. Cargar status guardado
    const savedStatus = localStorage.getItem(STATUS_KEY) || "all";

    // Decirle al componente cuál es el activo
    statusFilter.setAttribute("active", savedStatus);

    // 🔹 3. Render inicial según status
    applyFilter(savedStatus);

    // 🔹 4. Escuchar cambios del filtro
    statusFilter.addEventListener("status-change", (e) => {
      const status = e.detail;
      localStorage.setItem(STATUS_KEY, status);
      applyFilter(status);
    });

  } catch (error) {
    console.error(error);
    charactersContainer.innerHTML = `<p>Error loading characters</p>`;
  }
}

function applyFilter(status) {
  if (status === "all") {
    renderCharacters(allCharacters);
  } else {
    const filtered = allCharacters.filter(
      c => c.status.toLowerCase() === status
    );
    renderCharacters(filtered);
  }
}

// 🔹 función reutilizable
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
