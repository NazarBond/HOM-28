import axios from 'axios';

const API_KEY = 'f46c1d0ce2a6997d57e3d839898c078e';
const BASE_URL = 'https://api.themoviedb.org/3';

export const movieApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export const fetchTrendingMovies = async () => {
  const response = await movieApi.get('/trending/movie/day');
  return response.data.results;
};

export const fetchMoviesByQuery = async (query) => {
  const response = await movieApi.get('/search/movie', {
    params: { query },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await movieApi.get(`/movie/${movieId}`);
  return response.data;
};

export const fetchMovieCast = async (movieId) => {
  const response = await movieApi.get(`/movie/${movieId}/credits`);
  return response.data.cast;
};

export const fetchMovieReviews = async (movieId) => {
  const response = await movieApi.get(`/movie/${movieId}/reviews`);
  return response.data.results;
};
