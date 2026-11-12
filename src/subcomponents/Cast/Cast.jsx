import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "f46c1d0ce2a6997d57e3d839898c078e";
const BASE_URL = "https://api.themoviedb.org/3";

export default function Cast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchCast = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/movie/${movieId}/credits`,
          {
            params: { api_key: API_KEY, language: "en-US" },
          }
        );
        setCast(response.data.cast);
      } catch (err) {
        console.error("Cast fetch error:", err);
        setError("Не вдалося завантажити інформацію про акторів.");
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <p>Завантаження акторів...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!cast || cast.length === 0)
    return <p>Інформація про акторів відсутня.</p>;

  return (
    <div>
      <h3>Cast</h3>
      <ul
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
          gap: "15px",
          listStyle: "none",
          padding: 0,
        }}
      >
        {cast.map((actor) => {
          const profileImg = actor.profile_path
            ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
            : "https://via.placeholder.com/120x180?text=No+Photo";

          return (
            <li
              key={actor.cast_id || actor.id}
              style={{
                background: "#f4f4f4",
                padding: "8px",
                borderRadius: "6px",
                textAlign: "center",
              }}
            >
              <img
                src={profileImg}
                alt={actor.name}
                width="100"
                style={{
                  borderRadius: "4px",
                  objectFit: "cover",
                  height: "150px",
                }}
              />
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "14px",
                  margin: "8px 0 4px",
                  color: "#333",
                }}
              >
                {actor.name}
              </p>
              <p style={{ fontSize: "12px", color: "#666", margin: 0 }}>
                Character: {actor.character}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
