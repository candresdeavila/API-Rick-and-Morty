export function qs(selector) {
  return document.querySelector(selector);
}

export function createElement(tag, className = "", innerHTML = "") {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (innerHTML) el.innerHTML = innerHTML;
  return el;
}
