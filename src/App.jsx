import { useState, useEffect } from 'react';
import './App.css';
import { products, categories } from './data';
import ProductCard from './components/ProductCard';
import DetailModal from './components/DetailModal';

// icons as inline svg to avoid deps
const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

const SunIcon = () => <span>☀️</span>;
const MoonIcon = () => <span>🌙</span>;

function App() {
  const [searchVal, setSearchVal] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [stockOnly, setStockOnly] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('favs');
    return saved ? JSON.parse(saved) : [];
  });
  const [likes, setLikes] = useState(() => {
    const saved = localStorage.getItem('likes');
    return saved ? JSON.parse(saved) : {};
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });
  const [selectedProduct, setSelectedProduct] = useState(null);

  // persist theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // persist favs
  useEffect(() => {
    localStorage.setItem('favs', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const toggleFav = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const toggleLike = (id) => {
    setLikes(prev => ({
      ...prev,
      [id]: prev[id] ? 0 : 1
    }));
  };

  const resetFilters = () => {
    setSearchVal('');
    setCategory('all');
    setSortBy('default');
    setStockOnly(false);
  };

  // grab filtered data based on inputs
  const listData = products
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.description.toLowerCase().includes(searchVal.toLowerCase()) ||
        p.tags.find(t => t.includes(searchVal.toLowerCase()));
      const matchCat = category === 'all' || p.category === category;
      const matchStock = !stockOnly || p.inStock;
      return matchSearch && matchCat && matchStock;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'reviews') return b.reviews - a.reviews;
      return 0; // default order
    });

  // tally up stats
  const stats = listData.reduce((acc, p) => {
    acc.total++;
    acc.avgPrice += p.price;
    acc.inStock += p.inStock ? 1 : 0;
    return acc;
  }, { total: 0, avgPrice: 0, inStock: 0 });

  if (stats.total > 0) stats.avgPrice = (stats.avgPrice / stats.total).toFixed(2);

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <div className="logo-icon">⚡</div>
            <div className="logo-text">Tech<span>Vault</span></div>
          </div>
          <button className="theme-btn" onClick={toggleTheme} title="Toggle theme">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
      </header>

      <div className="toolbar">
        <div className="search-row">
          <div className="search-box">
            <SearchIcon />
            <input
              className="search-input"
              type="text"
              placeholder="Search products, brands, tags..."
              value={searchVal}
              onChange={e => setSearchVal(e.target.value)}
            />
          </div>
        </div>

        <div className="filters">
          <select
            className="filter-select"
            value={category}
            onChange={e => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
          >
            <option value="default">Sort: Default</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="rating">Top Rated</option>
            <option value="name">A → Z</option>
            <option value="reviews">Most Reviewed</option>
          </select>

          <button
            className={`stock-toggle ${stockOnly ? 'active' : ''}`}
            onClick={() => setStockOnly(s => !s)}
          >
            <span className="dot"></span>
            In Stock Only
          </button>

          <span className="results-count">
            {listData.length} product{listData.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {listData.length > 0 && (
        <div className="stats-bar">
          <div className="stat-chip">📦 <strong>{stats.total}</strong> showing</div>
          <div className="stat-chip" style={{ animationDelay: '0.1s' }}>💰 Avg: <strong>${stats.avgPrice}</strong></div>
          <div className="stat-chip" style={{ animationDelay: '0.2s' }}>✅ <strong>{stats.inStock}</strong> in stock</div>
          <div className="stat-chip" style={{ animationDelay: '0.3s' }}>❤️ <strong>{favorites.length}</strong> favorited</div>
        </div>
      )}

      <div className="grid-wrapper">
        <div className="product-grid">
          {listData.length > 0 ? (
            listData.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                isFav={favorites.includes(product.id)}
                isLiked={!!likes[product.id]}
                onToggleFav={() => toggleFav(product.id)}
                onToggleLike={() => toggleLike(product.id)}
                onViewMore={() => setSelectedProduct(product)}
                delay={i * 0.05}
              />
            ))
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🔍</div>
              <h3 className="empty-title">No products found</h3>
              <p className="empty-desc">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button className="btn-reset" onClick={resetFilters}>
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedProduct && (
        <DetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          isFav={favorites.includes(selectedProduct.id)}
          onToggleFav={() => toggleFav(selectedProduct.id)}
        />
      )}
    </>
  );
}

export default App;
