import { useEffect, useState, useRef } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  Link,
  Routes,
  Route,
} from "react-router-dom";
import axios from "axios";

import Cast from "../../subcomponents/Cast/Cast";
import Reviews from "../../subcomponents/Reviews/Reviews";

const API_KEY = "f46c1d0ce2a6997d57e3d839898c078e"; // Заміни на свій ключ TMDB
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const backLinkRef = useRef(location.state?.from ?? "/movies");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
          },
        });
        setMovie(response.data);
      } catch (err) {
        setError("Не вдалося завантажити інформацію про фільм.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading)
    return (
      <div style={{ padding: "20px" }}>Завантаження деталей фільму...</div>
    );
  if (error)
    return <div style={{ padding: "20px", color: "red" }}>{error}</div>;
  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  const userScore = movie.vote_average
    ? Math.round(movie.vote_average * 10)
    : 0;
  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "";
  const genres = movie.genres ? movie.genres.map((g) => g.name).join(", ") : "";

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => navigate(backLinkRef.current)}
        style={{ marginBottom: "20px", padding: "8px 16px", cursor: "pointer" }}
      >
        &#8592; Go back
      </button>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <img
          src={posterUrl}
          alt={movie.title || movie.name}
          width="250"
          style={{ borderRadius: "8px" }}
        />
        <div>
          <h1>
            {movie.title || movie.name} {releaseYear && `(${releaseYear})`}
          </h1>
          <p>
            <strong>User Score:</strong> {userScore}%
          </p>

          <h2>Overview</h2>
          <p>{movie.overview}</p>

          <h2>Genres</h2>
          <p>{genres}</p>
        </div>
      </div>

      <div
        style={{
          marginTop: "30px",
          borderTop: "1px solid #ccc",
          paddingTop: "15px",
        }}
      >
        <h3>Additional information</h3>
        <ul
          style={{
            display: "flex",
            gap: "20px",
            listStyle: "none",
            padding: 0,
          }}
        >
          <li>
            <Link to="cast" state={{ from: backLinkRef.current }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLinkRef.current }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      <div style={{ marginTop: "20px" }}>
        <Routes>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Routes>
      </div>
    </div>
  );
}
