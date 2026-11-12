import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "ТВОЙ_API_KEY"; // Заміни на свій реальний ключ TMDB
const BASE_URL = "https://api.themoviedb.org/3";

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}/movie/${movieId}/reviews`,
          {
            params: { api_key: API_KEY, language: "en-US" },
          }
        );
        setReviews(response.data.results);
      } catch (err) {
        setError("Не вдалося завантажити відгуки.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <p>Завантаження відгуків...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (reviews.length === 0)
    return <p>We don't have any reviews for this movie yet.</p>;

  return (
    <div>
      <h3>Reviews</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {reviews.reverse().map((review) => (
          <li
            key={review.id}
            style={{
              marginBottom: "20px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "15px",
            }}
          >
            <h4 style={{ margin: "0 0 5px" }}>Author: {review.author}</h4>
            <p style={{ fontSize: "14px", lineHeight: "1.5" }}>
              {review.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
