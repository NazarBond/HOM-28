import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import MoviesPage from "./pages/MoviesPage/MoviesPage";
import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";
import Navigation from "./components/Navigation/Navigation";

export default function App() {
  return (
    <div className="app-container">
      {/* Навігація */}
      <Navigation />

      {/* Маршрутизація */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          {/* Зірочка вкінці обов'язкова для вкладених роутів (Cast / Reviews) */}
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </div>
  );
}
