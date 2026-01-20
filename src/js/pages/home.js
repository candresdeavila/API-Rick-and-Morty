import { getCharacters } from "../api/rickApi.js";

const CHARACTERS_KEY = "rm-characters";
const STATUS_KEY = "rm-status";
const SEARCH_KEY = "rm-search";

let allCharacters = [];
let currentStatus = "all";
let currentSearch = "";

export async function initHome() {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <div class="flex flex-col gap-4 mb-6">

      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 class="text-3xl font-bold">Rick & Morty Characters</h1>
        <search-bar></search-bar>
      </div>

      <status-filter></status-filter>
    </div>

    <div 
      id="characters"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
    ></div>
  `;

  const charactersContainer = document.querySelector("#characters");
  const statusFilter = document.querySelector("status-filter");
  const searchBar = document.querySelector("search-bar");

  try {
    // 🔹 1. Personajes (localStorage o API)
    const storedCharacters = localStorage.getItem(CHARACTERS_KEY);

    if (storedCharacters) {
      allCharacters = JSON.parse(storedCharacters);
    } else {
      const { results } = await getCharacters();
      allCharacters = results;
      localStorage.setItem(CHARACTERS_KEY, JSON.stringify(allCharacters));
    }

    // 🔹 2. Estados guardados
    currentStatus = localStorage.getItem(STATUS_KEY) || "all";
    currentSearch = localStorage.getItem(SEARCH_KEY) || "";

    statusFilter.setAttribute("active", currentStatus);
    searchBar.setAttribute("value", currentSearch);

    // 🔹 3. Render inicial
    applyFilters();

    // 🔹 4. Eventos
    statusFilter.addEventListener("status-change", (e) => {
      currentStatus = e.detail;
      localStorage.setItem(STATUS_KEY, currentStatus);
      applyFilters();
    });

    searchBar.addEventListener("search-change", (e) => {
      currentSearch = e.detail;
      localStorage.setItem(SEARCH_KEY, currentSearch);
      // 🔥 sincroniza el input siempre
      searchBar.setAttribute("value", currentSearch);
      applyFilters();
    });

  } catch (error) {
    console.error(error);
    charactersContainer.innerHTML = `<p>Error loading characters</p>`;
  }
}

function applyFilters() {
  let filtered = [...allCharacters];

  // 🔹 Status
  if (currentStatus !== "all") {
    filtered = filtered.filter(
      c => c.status.toLowerCase() === currentStatus
    );
  }

  // 🔹 Search
  if (currentSearch.trim() !== "") {
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(currentSearch)
    );
  }

  renderCharacters(filtered);
}

// 🔹 función reutilizable
function renderCharacters(characters) {
  const charactersContainer = document.querySelector("#characters");

  if (characters.length === 0) {
    charactersContainer.innerHTML = `
      <p class="col-span-full text-center text-slate-400">
        No characters found
      </p>`;
    return;
  }

  charactersContainer.innerHTML = characters.map(c => `
    <character-card
      name="${c.name}"
      species="${c.species}"
      image="${c.image}"
      id="${c.id}">
    </character-card>
  `).join("");
}
