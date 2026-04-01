import MovieCard from "./MovieCard";
import "./MovieList.css";

// 🎬 MovieList handles ALL display states in one place
export default function MovieList({ movies, status, error, query }) {

  // ── Idle state: before any search ──
  if (status === "idle") {
    return (
      <div className="state-container idle-state">
        <div className="state-icon">🎥</div>
        <h2>Start Searching</h2>
        <p>Type a movie name above to discover films</p>
      </div>
    );
  }

  // ── Loading state ──
  if (status === "loading") {
    return (
      <div className="state-container loading-state">
        <div className="loader-ring" aria-label="Loading results..." role="status">
          <div /><div /><div /><div />
        </div>
        <p>Searching for "<strong>{query}</strong>"…</p>
      </div>
    );
  }

  // ── Error state: network or API failure ──
  if (status === "error") {
    return (
      <div className="state-container error-state">
        <div className="state-icon">⚠️</div>
        <h2>Something went wrong</h2>
        <p className="state-message">{error}</p>
        <p className="state-hint">Check your internet connection or API key and try again.</p>
      </div>
    );
  }

  // ── Empty state: API responded but no movies matched ──
  if (status === "empty") {
    return (
      <div className="state-container empty-state">
        <div className="state-icon">🔎</div>
        <h2>No results found</h2>
        <p>
          We couldn't find any movies matching "<strong>{query}</strong>".
        </p>
        <p className="state-hint">Try a different spelling or a broader search term.</p>
      </div>
    );
  }

  // ── Success state: render movie grid ──
  return (
    <section className="movie-list-section">
      <div className="results-header">
        <p className="results-count">
          Showing <strong>{movies.length}</strong> results for "<strong>{query}</strong>"
        </p>
      </div>
      <div className="movie-grid" role="list">
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </section>
  );
}
