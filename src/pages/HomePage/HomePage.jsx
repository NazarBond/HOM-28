import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrendingMovies()
      .then(setMovies)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className={css.container}>
      <h1 className={css.title}>Trending today</h1>
      {loading && <Loader />}
      {!loading && <MovieList movies={movies} />}
    </main>
  );
}
