import { useState, useEffect } from "react";
import { useSearchParams, Link, useLocation } from "react-router-dom";
import { fetchMoviesByQuery } from "../../services/api";

export default function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") ?? "";

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [inputValue, setInputValue] = useState(query);

  const location = useLocation();

  useEffect(() => {
    if (!query) {
      setMovies([]);
      return;
    }

    const searchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const results = await fetchMoviesByQuery(query);
        setMovies(results);
      } catch (err) {
        console.error("Search error:", err);
        setError("Не вдалося виконати пошук фільмів.");
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedQuery = inputValue.trim();
    if (!trimmedQuery) {
      setSearchParams({});
      return;
    }
    setSearchParams({ query: trimmedQuery });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Movies</h2>

      <form
        onSubmit={handleSubmit}
        style={{ marginBottom: "20px", display: "flex", gap: "10px" }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search movies..."
          style={{
            padding: "8px 12px",
            fontSize: "16px",
            width: "300px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            cursor: "pointer",
            borderRadius: "4px",
            background: "#007bff",
            color: "#fff",
            border: "none",
          }}
        >
          Search
        </button>
      </form>

      {loading && <p>Завантаження фільмів...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: "20px",
        }}
      >
        {movies.map((movie) => {
          const posterUrl = movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : "https://via.placeholder.com/300x450?text=No+Image";

          return (
            <li
              key={movie.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                overflow: "hidden",
                background: "#fff",
              }}
            >
              <Link
                to={`/movies/${movie.id}`}
                state={{ from: location }}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "block",
                }}
              >
                <img
                  src={posterUrl}
                  alt={movie.title || movie.name}
                  style={{ width: "100%", height: "270px", objectFit: "cover" }}
                />
                <div style={{ padding: "10px" }}>
                  <h4
                    style={{
                      fontSize: "14px",
                      margin: "0 0 5px",
                      height: "40px",
                      overflow: "hidden",
                    }}
                  >
                    {movie.title || movie.name}
                  </h4>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
