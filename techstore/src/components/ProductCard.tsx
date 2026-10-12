import { useState } from "react";
import type { Product } from "../types/Product";
import { formatCurrency } from "../utils/currency";

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  isFavorite: boolean;
  onAdd: (product: Product) => void;
  onToggleFavorite: () => void;
}

export function ProductCard({
  product,
  quantityInCart,
  isFavorite,
  onAdd,
  onToggleFavorite,
}: ProductCardProps) {
  const [showDescription, setShowDescription] = useState(false);

  const isOutOfStock = product.stock === 0;
  const reachedLimit = quantityInCart >= product.stock;
  const isDisabled = isOutOfStock || reachedLimit;

  function getButtonText() {
    if (isOutOfStock) return "Agotado";
    if (reachedLimit) return "Máximo alcanzado";
    return "Agregar al carrito";
  }

  return (
    <article className="product-card">
      <div className="product-image" style={{ position: 'relative' }}>
        {product.emoji}
        <button
          type="button"
          onClick={onToggleFavorite}
          style={{
            position: 'absolute',
            top: '8px',
            right: '8px',
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '32px',
            height: '32px',
            padding: '0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            color: isFavorite ? '#d03a4a' : '#b8c0d0',
            fontSize: '1rem',
          }}
          aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <span className="category">{product.category}</span>
      <h3>{product.name}</h3>
      <p className="price">{formatCurrency(product.price)}</p>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#69738a', fontSize: '0.8rem', margin: '4px 0 12px' }}>
        <span style={{ color: product.stock > 0 ? '#10b981' : '#ef4444' }}>●</span>
        <span>{product.stock} disponibles</span>
      </div>

      <button
        type="button"
        onClick={() => setShowDescription(!showDescription)}
        style={{
          background: 'none',
          color: '#3164f4',
          padding: '0',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          fontSize: '0.85rem',
          fontWeight: 'bold',
          marginBottom: '12px',
          cursor: 'pointer'
        }}
      >
        {showDescription ? "Ocultar información" : "Ver más información"}
        <span style={{ transform: showDescription ? 'rotate(180deg)' : 'none', display: 'inline-block', transition: 'transform 0.2s' }}>▼</span>
      </button>

      {showDescription && (
        <p style={{ fontSize: '0.85rem', color: '#69738a', marginBottom: '16px', lineHeight: '1.4' }}>
          {product.description || "Teclado compacto y silencioso, diseñado para escribir y jugar con una respuesta táctil precisa."}
        </p>
      )}

      <button
        type="button"
        disabled={isDisabled}
        onClick={() => onAdd(product)}
      >
        {getButtonText()}
      </button>
    </article>
  );
}