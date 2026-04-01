import { useState, useEffect, useRef } from "react";
import "./SearchBar.css";

// ⏱️ Custom hook: delays the search call until user stops typing (300ms)
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer); // cleanup on each keystroke
  }, [value, delay]);

  return debounced;
}

export default function SearchBar({ onSearch, isLoading }) {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500); // waits 500ms after typing stops
  const isFirstRender = useRef(true);

  // 🔄 Auto-search when debounced value changes (skip on first render)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (debouncedValue.trim()) {
      onSearch(debouncedValue);
    }
  }, [debouncedValue, onSearch]);

  // 🖱️ Manual search on button click
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <div className="search-input-wrapper">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          className="search-input"
          placeholder="Search for a movie..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          aria-label="Search movies"
          autoFocus
        />
        {/* Clear button — only visible when there's text */}
        {inputValue && (
          <button
            type="button"
            className="clear-btn"
            onClick={() => setInputValue("")}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      <button
        type="submit"
        className="search-btn"
        disabled={isLoading || !inputValue.trim()}
        aria-label="Search"
      >
        {isLoading ? <span className="spinner" aria-hidden="true" /> : "Search"}
      </button>
    </form>
  );
}
