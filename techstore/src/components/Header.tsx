interface HeaderProps {
  cartCount: number;
}

export function Header({ cartCount }: HeaderProps) {
  return (
    <header className="header">
      <a className="brand" href="#inicio">
        TechStore
      </a>

      <div className="cart-badge">
        🛒 Carrito <strong>{cartCount}</strong>
      </div>
    </header>
  );
}