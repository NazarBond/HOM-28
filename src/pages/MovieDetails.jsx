import { useEffect, useState, useRef } from "react";
import {
  useParams,
  useNavigate,
  useLocation,
  Routes,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import axios from "axios";

// Приклад підключення підкомпонентів (Cast та Reviews), якщо вони у тебе є в окремих файлах
// Увага: переконайся, що шляхи до цих компонентів відповідають твоїй структурі папок!
import MovieCast from "../components/MovieCast/MovieCast";
import MovieReviews from "../components/MovieReviews/MovieReviews";

const API_KEY = "ТУТ_ТВІЙ_КЛЮЧ_АБО_ТВОЄ_API"; // або імпорт твого сервісу
const BASE_URL = "https://api.themoviedb.org/3";

export default function MovieDetails() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Зберігаємо шлях, з якого прийшов користувач, щоб повернутися назад
  const backLinkHref = useRef(location.state?.from || "/movies");

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        // Запит до TMDB API (заміни на свій axios/fetch сервіс, якщо використовуєш його)
        const response = await axios.get(`${BASE_URL}/movie/${movieId}`, {
          params: {
            api_key: "ТВОЙ_API_KEY_TMDB", // Встав свій ключ або використовуй імпортований сервіс
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
    return <div className="loader">Завантаження деталей фільму...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!movie) return null;

  // Формування постеру
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
    <div className="movie-details-container">
      {/* Кнопка повернення назад */}
      <button
        className="back-btn"
        onClick={() => navigate(backLinkHref.current)}
      >
        &#8592; Go back
      </button>

      {/* Основна інформація про фільм */}
      <div
        className="movie-info-card"
        style={{ display: "flex", gap: "20px", marginTop: "20px" }}
      >
        <img
          src={posterUrl}
          alt={movie.title || movie.name}
          width="300"
          style={{ borderRadius: "8px" }}
        />
        <div>
          <h1>
            {movie.title || movie.name} {releaseYear && `(${releaseYear})`}
          </h1>
          <p>User Score: {userScore}%</p>

          <h2>Owerview</h2>
          <p>{movie.overview}</p>

          <h2>Genres</h2>
          <p>{genres}</p>
        </div>
      </div>

      {/* Додаткова інформація (Cast / Reviews) */}
      <div className="additional-info" style={{ marginTop: "30px" }}>
        <h3>Additional information</h3>
        <ul
          style={{
            display: "flex",
            gap: "15px",
            listStyle: "none",
            padding: 0,
          }}
        >
          <li>
            <Link to="cast" state={{ from: backLinkHref.current }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLinkHref.current }}>
              Reviews
            </Link>
          </li>
        </ul>
      </div>

      {/* Відображення підмаршрутів (Cast або Reviews) */}
      <div className="nested-route-content" style={{ marginTop: "20px" }}>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </div>
    </div>
  );
}
