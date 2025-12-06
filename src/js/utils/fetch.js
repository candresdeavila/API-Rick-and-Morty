export async function apiFetch(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  return response.json();
}
