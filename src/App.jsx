import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { lazy, Suspense } from "react";

// Використовуємо lazy loading для оптимізації завантаження сторінок
const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetails = lazy(() => import("./pages/MovieDetails/MovieDetails"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));

export default function App() {
  return (
    <HashRouter>
      <div className="app-container">
        {/* Навігаційна панель сайту */}
        <header className="header">
          <nav className="nav-menu">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/movies" className="nav-link">
              Movies
            </Link>
          </nav>
        </header>

        {/* Основний вміст із обробкою завантаження */}
        <main className="main-content">
          <Suspense
            fallback={<div className="loading-spinner">Завантаження...</div>}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />

              {/* Зірочка вкінці обов'язкова, щоб MovieDetails міг рендерити вкладені маршрути (Cast, Reviews) */}
              <Route path="/movies/:movieId/*" element={<MovieDetails />} />

              {/* Сторінка 404 для всіх інших неіснуючих шляхів */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </HashRouter>
  );
}
