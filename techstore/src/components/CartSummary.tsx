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

  const FREE_SHIPPING_THRESHOLD = 1000000;
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - totalPrice;

  return (
    <aside className="cart-summary">
      <span className="catalog-subtitle" style={{ display: 'block', marginBottom: '8px', textTransform: 'uppercase' }}>Tu selección</span>
      <div className="cart-heading">
        <h2>Carrito ({totalUnits})</h2>
        {cart.length > 0 && (
          <button className="clear-button" type="button" onClick={onClear}>
            Vaciar
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div style={{ padding: '40px 0', textAlign: 'center' }}>
          <span style={{ fontSize: '3rem', display: 'block', marginBottom: '16px' }}>🛒</span>
          <p style={{ margin: '0 0 8px 0', fontWeight: 'bold' }}>Tu carrito está vacío.</p>
          <p style={{ margin: '0', fontSize: '0.85rem', color: '#69738a' }}>Agrega productos para comenzar.</p>
        </div>
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

          <div style={{ padding: '12px', marginTop: '16px', borderRadius: '8px', backgroundColor: '#eef2ff', color: '#3164f4', fontSize: '0.85rem', textAlign: 'center' }}>
            {amountToFreeShipping > 0 ? (
              <span>¡Agrega <strong>{formatCurrency(amountToFreeShipping)}</strong> más para obtener envío gratis!</span>
            ) : (
              <span>¡Felicidades! Tienes <strong>envío gratis</strong>.</span>
            )}
          </div>

          <div className="cart-total">
            <span>Total</span>
            <div style={{ textAlign: 'right' }}>
              <strong>{formatCurrency(totalPrice)}</strong>
              <div style={{ fontSize: '0.7rem', color: '#69738a', marginTop: '4px' }}>Impuestos incluidos. Envío calculado al finalizar.</div>
            </div>
          </div>
        </>
      )}
    </aside>
  );
}