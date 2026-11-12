import { useEffect, useState } from "react";
import {
  useParams,
  Link,
  useNavigate,
  useLocation,
  Routes,
  Route,
} from "react-router-dom";
import axios from "axios";

// Твій базовий ключ та URL (заміни на свої або імпортуй зі свого файлу сервісу)
const API_KEY = "f46c1d0ce2a6997d57e3d839898c078e";
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieDetails() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Зберігаємо шлях для кнопки "Назад"
  const backLinkHref = location.state?.from ?? "/movies";

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        // Робимо запит за конкретним ID фільму
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          params: {
            api_key: API_KEY,
            language: "en-US",
          },
        });
        setMovie(response.data);
      } catch (err) {
        setError("Не вдалося завантажити дані фільму");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) return <p>Завантаження...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  return (
    <div style={{ padding: "20px" }}>
      {/* Кнопка повернення */}
      <button
        onClick={() => navigate(backLinkHref)}
        style={{ marginBottom: "20px" }}
      >
        &#8592; Go back
      </button>

      {/* Головна інформація про фільм */}
      <div style={{ display: "flex", gap: "20px" }}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "https://via.placeholder.com/300x450?text=No+Image"
          }
          alt={movie.title}
          width="250"
        />
        <div>
          <h1>
            {movie.title} ({movie.release_date?.slice(0, 4)})
          </h1>
          <p>User Score: {Math.round(movie.vote_average * 10)}%</p>
          <h3>Overview</h3>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <p>{movie.genres?.map((g) => g.name).join(", ")}</p>
        </div>
      </div>

      {/* Посилання на додаткову інформацію */}
      <div style={{ marginTop: "30px" }}>
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link to="cast" state={{ from: backLinkHref }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLinkHref }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      {/* Місце для виведення вкладених маршрутів (Cast / Reviews) */}
      <Routes>
        <Route path="cast" element={<div>Тут буде компонент Cast</div>} />
        <Route path="reviews" element={<div>Тут буде компонент Reviews</div>} />
      </Routes>
    </div>
  );
}
