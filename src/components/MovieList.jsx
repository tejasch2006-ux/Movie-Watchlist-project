import MovieCard from "./MovieCard";
import "./MovieList.css";

export default function MovieList({ movies, loading, error }) {
  // 1. Loading State
  if (loading) {
    return <div className="loading-state">Loading movies...</div>;
  }

  // 2. Error State
  if (error) {
    return <div className="error-state">{error}</div>;
  }

  // 3. Grid Rendering (Dynamic List)
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
