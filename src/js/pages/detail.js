export function initDetail(id) {
  const app = document.querySelector("#app");

  app.innerHTML = `
    <character-detail id="${id}"></character-detail>
  `;
}
