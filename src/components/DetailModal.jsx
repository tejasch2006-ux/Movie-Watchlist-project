import { useEffect } from 'react';

function DetailModal({ product, onClose, isFav, onToggleFav }) {
  // close on escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // prevent body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <img className="modal-img" src={product.image} alt={product.name} />
        <div className="modal-body">
          <div className="modal-category">{product.category}</div>
          <h2 className="modal-title">{product.name}</h2>
          <p className="modal-desc">{product.description}</p>

          <div className="modal-info">
            <div className="modal-info-item">
              <span className="modal-info-label">Price</span>
              <span className="modal-info-value">${product.price}</span>
            </div>
            <div className="modal-info-item">
              <span className="modal-info-label">Brand</span>
              <span className="modal-info-value">{product.brand}</span>
            </div>
            <div className="modal-info-item">
              <span className="modal-info-label">Rating</span>
              <span className="modal-info-value">★ {product.rating}</span>
            </div>
            <div className="modal-info-item">
              <span className="modal-info-label">Reviews</span>
              <span className="modal-info-value">{product.reviews.toLocaleString()}</span>
            </div>
            <div className="modal-info-item">
              <span className="modal-info-label">Status</span>
              <span className="modal-info-value" style={{ color: product.inStock ? 'var(--success)' : 'var(--danger)' }}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>
          </div>

          <div className="modal-tags">
            {product.tags.map(tag => (
              <span className="tag" key={tag}>{tag}</span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              className="btn btn-primary"
              style={{ flex: 1, justifyContent: 'center' }}
              onClick={onToggleFav}
            >
              {isFav ? '❤️ Favorited' : '🤍 Add to Favorites'}
            </button>
            <button className="modal-close" onClick={onClose} style={{ flex: 1 }}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
