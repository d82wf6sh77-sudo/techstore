import type { Product } from "../types/Product";
import { formatCurrency } from "../utils/currency";

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  onAdd: (product: Product) => void;
}

export function ProductCard({
  product,
  quantityInCart,
  onAdd,
}: ProductCardProps) {
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
      <div className="product-image">{product.emoji}</div>

      <span className="category">{product.category}</span>
      <h3>{product.name}</h3>
      <p className="price">{formatCurrency(product.price)}</p>
      <p className="stock">Disponibles: {product.stock}</p>

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