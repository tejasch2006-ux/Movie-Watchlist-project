import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import MovieList from "./components/MovieList";
import "./App.css";

// 🔑 Fetching the API Key from .env
const API_KEY = import.meta.env.VITE_OMDB_API_KEY;
const BASE_URL = "https://www.omdbapi.com/";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔍 Function to fetch movies
  const fetchMovies = async (query) => {
    if (!query) return;

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setError(data.Error || "No results found.");
      }
    } catch (err) {
      setError("Something went wrong. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-icon">🎬</span>
          <span className="logo-text">CineSearch</span>
        </div>
        <p className="tagline">Discover movies. Build your watchlist.</p>
        <SearchBar onSearch={fetchMovies} isLoading={loading} />
      </header>

      <main className="app-main">
        <MovieList movies={movies} loading={loading} error={error} />
      </main>

      <footer className="app-footer">
        <p>Built with React & OMDb API</p>
      </footer>
    </div>
  );
}

export default App;
