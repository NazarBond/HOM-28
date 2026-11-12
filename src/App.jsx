import { HashRouter, Routes, Route, Link } from "react-router-dom";

// Прямі імпорти твоїх компонентів (переконайся, що вони лежать у src/components/)
import HomePage from "./components/HomePage";
import MoviesPage from "./components/MoviesPage";
import MovieDetails from "./components/MovieDetails";
import NotFoundPage from "./components/NotFoundPage";

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
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId/*" element={<MovieDetails />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  );
}
