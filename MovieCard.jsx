import { useState } from "react";
import "./MovieCard.css";

// 🖼️ Fallback image shown when OMDb has no poster
const FALLBACK_POSTER = "https://placehold.co/300x445/1a1a2e/a0a0c0?text=No+Poster";

export default function MovieCard({ movie }) {
  const [imgSrc, setImgSrc] = useState(
    // OMDb returns "N/A" when no poster exists — use fallback in that case
    movie.Poster && movie.Poster !== "N/A" ? movie.Poster : FALLBACK_POSTER
  );
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <article className="movie-card" aria-label={`${movie.Title} (${movie.Year})`}>
      {/* Poster image with loading skeleton + fallback */}
      <div className="card-poster-wrapper">
        {!imgLoaded && <div className="poster-skeleton" aria-hidden="true" />}
        <img
          src={imgSrc}
          alt={`${movie.Title} poster`}
          className={`card-poster ${imgLoaded ? "loaded" : "hidden"}`}
          onLoad={() => setImgLoaded(true)}
          onError={() => {
            setImgSrc(FALLBACK_POSTER); // swap to fallback if image URL breaks
            setImgLoaded(true);
          }}
          loading="lazy" // browser native lazy loading
        />
        <div className="card-year-badge">{movie.Year}</div>
      </div>

      {/* Card info */}
      <div className="card-info">
        <h3 className="card-title" title={movie.Title}>
          {movie.Title}
        </h3>
        <div className="card-meta">
          <span className="card-type">{movie.Type || "movie"}</span>
        </div>
      </div>

      {/* Hover overlay with quick action */}
      <div className="card-overlay" aria-hidden="true">
        <button className="overlay-btn">+ Watchlist</button>
      </div>
    </article>
  );
}
