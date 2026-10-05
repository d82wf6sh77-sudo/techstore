import type { CartItem } from "../types/CartItem";
import type { Product } from "../types/Product";
import { ProductCard } from "./ProductCard";

interface ProductListProps {
  products: Product[];
  cart: CartItem[];
  onAdd: (product: Product) => void;
}

export function ProductList({ products, cart, onAdd }: ProductListProps) {
  if (products.length === 0) {
    return <p className="no-results">No encontramos productos.</p>;
  }

  return (
    <section>
      <h2>Productos destacados</h2>

      <div className="product-grid">
        {products.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id);

          return (
            <ProductCard
              key={product.id}
              product={product}
              quantityInCart={cartItem?.quantity ?? 0}
              onAdd={onAdd}
            />
          );
        })}
      </div>
    </section>
  );
}