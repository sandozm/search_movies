const OMDB_API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;
const API_URL = `http://www.omdbapi.com/?apikey=${OMDB_API_KEY}`;

export const fetchMovies = async (query, currentPage = 1) => {
  const response = await fetch(`${API_URL}${query}&page=${currentPage}`);
  const data = await response.json();
  return data || [];
};

export const fetchMovieById = async (id) => {
  const response = await fetch(`${API_URL}&i=${id}`);
  const data = await response.json();
  return data;
};
