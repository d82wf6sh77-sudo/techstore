import type { CartItem } from "../types/CartItem";
import { formatCurrency } from "../utils/currency";

interface CartSummaryProps {
  cart: CartItem[];
  onIncrease: (productId: number) => void;
  onDecrease: (productId: number) => void;
  onRemove: (productId: number) => void;
  onClear: () => void;
}

export function CartSummary({
  cart,
  onIncrease,
  onDecrease,
  onRemove,
  onClear,
}: CartSummaryProps) {
  const totalUnits = cart.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <aside className="cart-summary">
      <div className="cart-heading">
        <h2>Carrito ({totalUnits})</h2>
        {cart.length > 0 && (
          <button className="clear-button" type="button" onClick={onClear}>
            Vaciar
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          <ul className="cart-list complete">
            {cart.map((item) => (
              <li key={item.id}>
                <span className="cart-emoji">{item.emoji}</span>

                <div className="cart-info">
                  <strong>{item.name}</strong>
                  <small>{formatCurrency(item.price)} por unidad</small>

                  <div className="quantity-controls">
                    <button
                      type="button"
                      aria-label={`Disminuir ${item.name}`}
                      onClick={() => onDecrease(item.id)}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      type="button"
                      disabled={item.quantity >= item.stock}
                      aria-label={`Aumentar ${item.name}`}
                      onClick={() => onIncrease(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-end">
                  <strong>{formatCurrency(item.price * item.quantity)}</strong>
                  <button
                    className="remove-button"
                    type="button"
                    onClick={() => onRemove(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="cart-total">
            <span>Total</span>
            <strong>{formatCurrency(totalPrice)}</strong>
          </div>
        </>
      )}
    </aside>
  );
}