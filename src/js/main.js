import { initHome } from "./pages/home.js";
import "./components/wc/index.js";
import { initDetail } from "./pages/detail.js";
import "./components/filters/index.js";

document.addEventListener("DOMContentLoaded", () => {
  initHome();

  document.addEventListener("character-selected", (e) => {
    initDetail(e.detail); // e.detail contiene el id
  });

  document.addEventListener("go-back", () => {
    initHome();
  });
});
