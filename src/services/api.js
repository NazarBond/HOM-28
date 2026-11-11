import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
const API_KEY = "f46c1d0ce2a6997d57e3d839898c078e"; // Заміни на свій реальний ключ з themoviedb.org

export async function fetchTrendingMovies() {
  const { data } = await axios.get(`/trending/movie/day?api_key=${API_KEY}`);
  return data.results;
}

export async function searchMovies(query) {
  const { data } = await axios.get(`/search/movie?api_key=${API_KEY}&query=${query}`);
  return data.results;
}

export async function fetchMovieDetails(movieId) {
  const { data } = await axios.get(`/movie/${movieId}?api_key=${API_KEY}`);
  return data;
}

export async function fetchMovieCast(movieId) {
  const { data } = await axios.get(`/movie/${movieId}/credits?api_key=${API_KEY}`);
  return data.cast;
}

export async function fetchMovieReviews(movieId) {
  const { data } = await axios.get(`/movie/${movieId}/reviews?api_key=${API_KEY}`);
  return data.results;
}
