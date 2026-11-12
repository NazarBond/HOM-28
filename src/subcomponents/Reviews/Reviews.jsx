import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieReviews } from "../../services/api";

export default function Reviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const getReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        console.error("Reviews fetch error:", err);
        setError("Не вдалося завантажити відгуки.");
      } finally {
        setLoading(false);
      }
    };

    getReviews();
  }, [movieId]);

  if (loading) return <p>Завантаження відгуків...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  if (!reviews || reviews.length === 0) {
    return <p>We don't have any reviews for this movie yet.</p>;
  }

  return (
    <div>
      <h3>Reviews</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {reviews.map((review) => (
          <li
            key={review.id}
            style={{
              marginBottom: "20px",
              borderBottom: "1px solid #ddd",
              paddingBottom: "15px",
            }}
          >
            <h4 style={{ margin: "0 0 5px", color: "#333" }}>
              Author: {review.author}
            </h4>
            <p style={{ fontSize: "14px", lineHeight: "1.5", color: "#555" }}>
              {review.content}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
