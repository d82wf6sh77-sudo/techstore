import { formatCurrency } from "../utils/currency";

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onClear: () => void;
}

export function Header({ cartCount, cartTotal, onClear }: HeaderProps) {
  return (
    <header className="header">
      <a className="brand" href="#inicio">
        TechStore
      </a>

      <div className="cart-badge" style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', position: 'relative' }}>
        <span style={{ fontSize: '1.5rem' }}>🛒</span>
        <strong style={{
          backgroundColor: '#c4f000',
          color: '#17213a',
          borderRadius: '50%',
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '0.85rem'
        }}>
          {cartCount}
        </strong>

        {cartCount > 0 && (
          <div className="cart-tooltip" style={{
            position: 'absolute',
            top: '100%',
            right: '0',
            marginTop: '8px',
            backgroundColor: '#17213a',
            color: 'white',
            borderRadius: '12px',
            padding: '16px',
            width: '200px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
            zIndex: 100,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            <span style={{ fontSize: '0.8rem', color: '#a9bcff' }}>Total del carrito</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{formatCurrency(cartTotal)}</span>
            <button
              type="button"
              onClick={onClear}
              style={{
                marginTop: '8px',
                width: '100%',
                backgroundColor: 'transparent',
                border: '1px solid #4a5c8c',
                color: 'white',
                padding: '8px',
                borderRadius: '8px',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Limpiar carrito
            </button>
          </div>
        )}
      </div>
    </header>
  );
}