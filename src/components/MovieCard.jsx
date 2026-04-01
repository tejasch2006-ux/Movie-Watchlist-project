import "./MovieCard.css";

export default function MovieCard({ movie, onAdd }) {
  // If the poster is "N/A", show a fallback image or text
  const posterUrl = movie.Poster === "N/A"
    ? "https://via.placeholder.com/300x450?text=No+Poster"
    : movie.Poster;

  return (
    <div className="movie-card">
      <img
        src={posterUrl}
        alt={movie.Title}
        className="movie-poster"
        loading="lazy"
      />
      <div className="movie-info">
        <h3 className="movie-title">{movie.Title}</h3>
        <p className="movie-year">{movie.Year}</p>
      </div>
    </div>
  );
}
