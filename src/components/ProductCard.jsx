function ProductCard({ product, isFav, isLiked, onToggleFav, onToggleLike, onViewMore, delay }) {
  return (
    <div className="card" style={{ animationDelay: `${delay}s` }}>
      <div className="card-img-wrap">
        <img
          className="card-img"
          src={product.image}
          alt={product.name}
          loading="lazy"
        />
        <span className={`card-badge ${product.inStock ? 'badge-instock' : 'badge-outofstock'}`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
        <button
          className={`card-fav ${isFav ? 'active' : ''}`}
          onClick={onToggleFav}
          title={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFav ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="card-body">
        <div className="card-category">{product.category}</div>
        <h3 className="card-title">{product.name}</h3>
        <p className="card-desc">{product.description}</p>

        <div className="card-meta">
          <div className="card-price">
            <span className="currency">$ </span>
            {product.price}
          </div>
          <div className="card-rating">
            <span className="star">★</span>
            {product.rating}
            <span className="reviews">({product.reviews.toLocaleString()})</span>
          </div>
        </div>

        <div className="card-actions">
          <button className="btn btn-primary" onClick={onViewMore}>
            View Details
          </button>
          <button
            className={`btn btn-like ${isLiked ? 'liked' : ''}`}
            onClick={onToggleLike}
            title="Like"
          >
            {isLiked ? '👍' : '👍🏻'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
