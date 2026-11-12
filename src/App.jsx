import { HashRouter, Routes, Route, Link } from "react-router-dom";

// Імпорти згідно з твоєю структурою папок
import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
// Якщо у тебе є окремий файл NotFoundPage, імпортуй його, або використай HomePage як запасний варіант
import Navigation from "./components/Navigation/Navigation";

export default function App() {
  return (
    <HashRouter>
      <div className="app-container">
        {/* Навігація */}
        <Navigation />

        {/* Маршрутизація */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
