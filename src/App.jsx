import { HashRouter, Routes, Route, Link } from "react-router-dom";
import { lazy, Suspense } from "react";

const HomePage = lazy(() => import("./pages/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  return (
    <HashRouter>
      <div className="app-container">
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

        <main className="main-content">
          <Suspense
            fallback={<div className="loading-spinner">Завантаження...</div>}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movies/:movieId/*" element={<MovieDetails />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
      </div>
    </HashRouter>
  );
}
