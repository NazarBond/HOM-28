import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { lazy, Suspense } from "react";

// Використовуємо React.lazy для оптимізації та швидкого завантаження
const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage")); // або простіший варіант, якщо такого немає

export default function App() {
  return (
    <HashRouter>
      <div className="app-container">
        {/* Навігаційна панель */}
        <header className="header">
          <nav className="nav">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/movies" className="nav-link">
              Movies
            </Link>
          </nav>
        </header>

        {/* Відображення сторінок з лоадером під час завантаження */}
        <main className="main-content">
          <Suspense
            fallback={<div className="loading">Завантаження сторінки...</div>}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movies/:movieId/*" element={<MovieDetails />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </HashRouter>
  );
}
