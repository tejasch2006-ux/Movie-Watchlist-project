import { useState, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import "./App.css";

// 🔑 API key is read from .env file (see STEP 1 in guide)
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error | empty
  const [error, setError] = useState("");
  const [lastQuery, setLastQuery] = useState("");

  // 🔍 Core fetch function — called by SearchBar
  const searchMovies = useCallback(async (query) => {
    const trimmed = query.trim();
    if (!trimmed) return;

    setLastQuery(trimmed);
    setStatus("loading");
    setError("");
    setMovies([]);

    try {
      const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(trimmed)}&type=movie`);

      if (!res.ok) throw new Error(`Network error: ${res.status}`);

      const data = await res.json();

      if (data.Response === "True") {
        setMovies(data.Search);
        setStatus("success");
      } else {
        // OMDb returns Response:"False" with an Error message when no results
        setStatus("empty");
        setError(data.Error || "No movies found.");
      }
    } catch (err) {
      setStatus("error");
      setError(err.message || "Something went wrong. Please try again.");
    }
  }, []);

  return (
    <div className="app">
      {/* ── Header ── */}
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">🎬</span>
          <span className="logo-text">CineSearch</span>
        </div>
        <p className="tagline">Discover movies. Build your watchlist.</p>
        <SearchBar onSearch={searchMovies} isLoading={status === "loading"} />
      </header>

      {/* ── Main content area ── */}
      <main className="app-main">
        <MovieList
          movies={movies}
          status={status}
          error={error}
          query={lastQuery}
        />
      </main>

      <footer className="app-footer">
        Powered by <a href="https://www.omdbapi.com" target="_blank" rel="noreferrer">OMDb API</a>
      </footer>
    </div>
  );
}
