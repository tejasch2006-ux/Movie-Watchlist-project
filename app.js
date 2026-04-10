const API_KEY = '4375071e'; // Updated with provided API key

// --- State ---
let movies = []; 
let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

// --- DOM Elements ---
const searchInput = document.getElementById('search-input');
const genreFilter = document.getElementById('genre-filter');
const yearFilter = document.getElementById('year-filter');
const sortSelect = document.getElementById('sort-select');
const movieGrid = document.getElementById('movie-grid');
const loadingSpinner = document.getElementById('loading-spinner');
const emptyState = document.getElementById('empty-state');
const emptyIcon = document.getElementById('empty-icon');
const emptyTitle = document.getElementById('empty-title');
const emptyDesc = document.getElementById('empty-desc');
const watchlistItemsContainer = document.getElementById('watchlist-items');
const watchlistEmpty = document.getElementById('watchlist-empty');
const watchlistCount = document.getElementById('watchlist-count');
const btnRandomMovie = document.getElementById('btn-random-movie');
const themeToggle = document.getElementById('theme-toggle');
const randomMovieModal = document.getElementById('random-movie-modal');
const closeModal = document.getElementById('close-modal');
const randomMovieDetails = document.getElementById('random-movie-details');
const toastContainer = document.getElementById('toast-container');

// --- Initialization ---
function init() {
    initTheme();
    renderWatchlist();
    setupEventListeners();
    // Show intro state on initially empty input
    if (!searchInput.value.trim()) {
        setEmptyState('intro');
    }
}

// --- Theme (Dark/Light Mode) ---
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
    themeToggle.textContent = isLight ? '☀️' : '🌙';
}

// --- Util & Enhancements ---
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = message;
    toastContainer.appendChild(toast);
    
    // Trigger layout for transition
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Auto-hide after 2 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300); // wait for CSS transition to finish
    }, 2000);
}

function animateBadge() {
    watchlistCount.classList.remove('bounce');
    void watchlistCount.offsetWidth; // Trigger reflow
    watchlistCount.classList.add('bounce');
}

function setEmptyState(status) {
    emptyState.classList.remove('hidden');
    movieGrid.innerHTML = '';
    
    if (status === 'intro') {
        emptyTitle.textContent = "Start discovering";
        emptyDesc.textContent = "Start typing to discover movies 🎬";
        emptyIcon.textContent = "👀";
    } else if (status === 'loading') {
        emptyTitle.textContent = "Searching...";
        emptyDesc.textContent = "Looking for matching movies...";
        emptyIcon.textContent = "⏳";
    } else if (status === 'error' || status === 'empty') {
        emptyTitle.textContent = "No Movies Found";
        emptyDesc.textContent = "Try searching for a different title or adjusting filters.";
        emptyIcon.textContent = "🤷‍♂️";
    }
}

// --- API ---
async function fetchMovies(query) {
    if (!query || !query.trim()) {
        movies = [];
        loadingSpinner.classList.add('hidden');
        setEmptyState('intro');
        return;
    }

    // UX: Show "Searching..." while loading
    setEmptyState('loading');
    loadingSpinner.classList.remove('hidden');

    try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}&type=movie`);
        const data = await res.json();
        
        if (data.Response === "False") {
            movies = [];
            setEmptyState('error');
        } else {
            // Fetch additional details
            const detailedPromises = data.Search.map(movie => 
                fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`)
                    .then(res => res.json())
            );
            movies = await Promise.all(detailedPromises);
            
            emptyState.classList.add('hidden'); // Hide empty state on success
            renderMovies(); 
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        movies = [];
        setEmptyState('error');
    } finally {
        loadingSpinner.classList.add('hidden');
    }
}

// --- Render ---
const FALLBACK_IMAGE = 'https://via.placeholder.com/300x450?text=No+Poster';

function renderMovies() {
    // Double check empty state just in case
    if (movies.length > 0) {
        emptyState.classList.add('hidden');
    }

    if (movies.length === 0 && searchInput.value.trim().length > 0) {
        setEmptyState('empty');
        return;
    }

    let processedMovies = movies.filter(movie => {
        const selectedGenre = genreFilter.value;
        if (selectedGenre && movie.Genre && !movie.Genre.includes(selectedGenre)) return false;

        const selectedYear = yearFilter.value;
        const yearInt = parseInt(movie.Year);
        if (selectedYear === '2020s' && yearInt < 2020) return false;
        if (selectedYear === '2010s' && (yearInt < 2010 || yearInt >= 2020)) return false;
        if (selectedYear === '2000s' && (yearInt < 2000 || yearInt >= 2010)) return false;
        if (selectedYear === 'older' && yearInt >= 2000) return false;

        return true;
    });

    processedMovies = processedMovies.sort((a, b) => {
        const sortVal = sortSelect.value;
        if (sortVal === 'title-asc') return a.Title.localeCompare(b.Title);
        if (sortVal === 'title-desc') return b.Title.localeCompare(a.Title);
        
        const yearA = parseInt(a.Year);
        const yearB = parseInt(b.Year);
        if (sortVal === 'year-new') return yearB - yearA;
        if (sortVal === 'year-old') return yearA - yearB;
        
        return 0; 
    });

    if (processedMovies.length === 0 && movies.length > 0) {
        setEmptyState('empty'); // Filters resulted in 0 matches
        return;
    }

    movieGrid.innerHTML = processedMovies.map(movie => {
        const isSaved = watchlist.find(item => item.imdbID === movie.imdbID);
        const posterSrc = movie.Poster !== "N/A" ? movie.Poster : FALLBACK_IMAGE;
        const rating = movie.imdbRating && movie.imdbRating !== 'N/A' ? movie.imdbRating : '--';
        const genre = movie.Genre ? movie.Genre.split(',')[0] : 'Unknown';

        // onerror handles deeply broken image links by swapping source
        return `
            <div class="movie-card">
                <div class="card-image-wrapper">
                    <img src="${posterSrc}" alt="${movie.Title} Poster" loading="lazy" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';"/>
                    <span class="genre-pill">${genre}</span>
                </div>
                <div class="card-content">
                    <h3>${movie.Title}</h3>
                    <div class="card-meta">
                        <span>📅 ${movie.Year}</span>
                        <span class="rating">⭐ ${rating}</span>
                    </div>
                    <button class="btn ${isSaved ? 'btn-outline' : 'btn-primary'}" 
                            onclick="toggleWatchlist('${movie.imdbID}')">
                        ${isSaved ? '✓ Saved' : '＋ Watchlist'}
                    </button>
                </div>
            </div>
        `;
    }).join('');
}

function renderWatchlist() {
    watchlistCount.textContent = watchlist.length;

    if (watchlist.length === 0) {
        watchlistEmpty.classList.remove('hidden');
        watchlistItemsContainer.classList.add('hidden');
        watchlistItemsContainer.innerHTML = '';
        return;
    }

    watchlistEmpty.classList.add('hidden');
    watchlistItemsContainer.classList.remove('hidden');

    watchlistItemsContainer.innerHTML = watchlist.map(movie => {
        const posterSrc = movie.Poster !== "N/A" ? movie.Poster : FALLBACK_IMAGE;
        return `
            <div class="sidebar-item">
                <img src="${posterSrc}" alt="${movie.Title}" loading="lazy" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';"/>
                <div class="sidebar-item-info">
                    <h4>${movie.Title}</h4>
                    <p>⭐ ${movie.imdbRating && movie.imdbRating !== 'N/A' ? movie.imdbRating : '--'} | ${movie.Year}</p>
                </div>
                <button class="btn-remove" onclick="removeFromWatchlist('${movie.imdbID}')" aria-label="Remove movie">
                    ✕
                </button>
            </div>
        `;
    }).join('');
}

// --- Watchlist Logic ---
window.toggleWatchlist = (id) => {
    const movie = movies.find(m => m.imdbID === id);
    if (!movie) return;

    const exists = watchlist.find(item => item.imdbID === id);

    if (exists) {
        removeFromWatchlist(id);
    } else {
        const savedMovie = { ...movie };
        watchlist = [...watchlist, savedMovie];
        updateLocalStorageAndUI();
        showToast("Added to Watchlist ✅");
    }
};

window.removeFromWatchlist = (id) => {
    watchlist = watchlist.filter(item => item.imdbID !== id);
    updateLocalStorageAndUI();
    showToast("Removed from Watchlist ❌");
};

function updateLocalStorageAndUI() {
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
    renderWatchlist();
    animateBadge();
    
    if (movies.length > 0) {
        renderMovies();
    }
}

// --- Random Movie Logic ---
function showRandomMovie() {
    if (watchlist.length === 0) {
        showToast("Add some movies first! 🎯");
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * watchlist.length);
    const movie = watchlist[randomIndex];
    const posterSrc = movie.Poster !== "N/A" ? movie.Poster : FALLBACK_IMAGE;

    randomMovieDetails.innerHTML = `
        <img src="${posterSrc}" alt="${movie.Title}" onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';"/>
        <h3>${movie.Title}</h3>
        <p>⭐ ${movie.imdbRating && movie.imdbRating !== 'N/A' ? movie.imdbRating : '--'} | 📅 ${movie.Year}</p>
        <p style="margin-top: 0.5rem; color: var(--text-secondary); font-size: 0.9rem;">${movie.Genre}</p>
    `;

    randomMovieModal.classList.remove('hidden');
}

function hideModal(e) {
    if (e.target === randomMovieModal || e.target === closeModal) {
        randomMovieModal.classList.add('hidden');
    }
}

// --- Events ---
function setupEventListeners() {
    themeToggle.addEventListener('click', toggleTheme);

    const debouncedFetch = debounce((e) => fetchMovies(e.target.value), 300);
    searchInput.addEventListener('input', debouncedFetch);

    genreFilter.addEventListener('change', renderMovies);
    yearFilter.addEventListener('change', renderMovies);
    sortSelect.addEventListener('change', renderMovies);

    btnRandomMovie.addEventListener('click', showRandomMovie);
    randomMovieModal.addEventListener('click', hideModal);
}

init();
