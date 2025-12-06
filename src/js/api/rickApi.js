const BASE_URL = "https://rickandmortyapi.com/api";

export async function getCharacters(page = 1) {
  const res = await fetch(`${BASE_URL}/character?page=${page}`);
  if (!res.ok) {
    throw new Error("Error fetching characters");
  }
  return res.json();
}
