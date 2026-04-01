import { useState, useEffect, useRef } from "react";
import "./SearchBar.css";

// ⏱️ Debounce function — triggered every 500ms when user stops typing
function useDebounce(value, delay) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounced(value);
    }, delay);

    return () => clearTimeout(timer); // cleanup the timeout every time the user types
  }, [value, delay]);

  return debounced;
}

export default function SearchBar({ onSearch, isLoading }) {
  const [inputValue, setInputValue] = useState("");
  const debouncedValue = useDebounce(inputValue, 500); // Trigger search every 500ms
  const isFirstRender = useRef(true);

  // 🔄 Automatic search on debounced value changes (skip on first render)
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
        {/* Simple Clear Button */}
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
