import type { CartItem } from "../types/CartItem";
import type { Product } from "../types/Product";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
  cart: CartItem[];
  favorites: number[];
  onAdd: (product: Product) => void;
  onToggleFavorite: (productId: number) => void;
}

export function ProductList({ products, cart, favorites, onAdd, onToggleFavorite }: ProductListProps) {
  if (products.length === 0) {
    return <p className="no-results">No encontramos productos.</p>;
  }

  return (
    <section>
      <header className="product-list-header">
        <div>
          <span className="catalog-subtitle">CATÁLOGO</span>
          <h2>Productos destacados</h2>
        </div>
        <span className="product-count">{products.length} productos</span>
      </header>

      <div className="product-grid">
        {products.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id);

          return (
            <ProductCard
              key={product.id}
              product={product}
              quantityInCart={cartItem?.quantity ?? 0}
              isFavorite={favorites.includes(product.id)}
              onAdd={onAdd}
              onToggleFavorite={() => onToggleFavorite(product.id)}
            />
          );
        })}
      </div>
    </section>
  );
}