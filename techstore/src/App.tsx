import { useState } from "react";
import { CartSummary } from "./components/CartSummary";
import { Filters } from "./components/Filters";
import { Header } from "./components/Header";
import { ProductList } from "./components/ProductList";
import { products } from "./data/products";
import type { CartItem } from "./types/CartItem";
import type { Product } from "./types/Product";

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [sortOrder, setSortOrder] = useState("Orden original");
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [...new Set(products.map((product) => product.category))];

  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "Todos" ||
      product.category === selectedCategory;

    const matchesAvailability = !onlyAvailable || product.stock > 0;
    const matchesFavorites = !showOnlyFavorites || favorites.includes(product.id);

    return matchesSearch && matchesCategory && matchesAvailability && matchesFavorites;
  });

  if (sortOrder === "Precio menor") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "Precio mayor") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  function toggleFavorite(productId: number) {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  }

  const totalUnits = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function addToCart(product: Product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.id === product.id);

      if (existingItem) {
        if (existingItem.quantity >= product.stock) {
          return currentCart;
        }

        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      if (product.stock === 0) {
        return currentCart;
      }

      return [...currentCart, { ...product, quantity: 1 }];
    });
  }

  function increaseQuantity(productId: number) {
    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item.id === productId && item.quantity < item.stock) {
          return { ...item, quantity: item.quantity + 1 };
        }

        return item;
      }),
    );
  }

  function decreaseQuantity(productId: number) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  function removeFromCart(productId: number) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId),
    );
  }

  function clearCart() {
    setCart([]);
  }

  return (
    <>
      <Header cartCount={totalUnits} cartTotal={totalPrice} onClear={clearCart} />

      <main id="inicio">
        <section className="hero">
          <p>Proyecto de clase</p>
          <h1>Tecnología para crear grandes ideas.</h1>
          <span>
            Explora el catálogo y agrega tus productos favoritos al carrito.
          </span>
        </section>

        <Filters
          search={search}
          selectedCategory={selectedCategory}
          categories={categories}
          sortOrder={sortOrder}
          onlyAvailable={onlyAvailable}
          showOnlyFavorites={showOnlyFavorites}
          favoritesCount={favorites.length}
          onSearchChange={setSearch}
          onCategoryChange={setSelectedCategory}
          onSortOrderChange={setSortOrder}
          onOnlyAvailableChange={setOnlyAvailable}
          onShowOnlyFavoritesChange={setShowOnlyFavorites}
          onClearFilters={() => {
            setSearch("");
            setSelectedCategory("Todos");
            setSortOrder("Orden original");
            setOnlyAvailable(false);
            setShowOnlyFavorites(false);
          }}
        />

        <div className="shop-layout">
          <ProductList
            products={filteredProducts}
            cart={cart}
            favorites={favorites}
            onAdd={addToCart}
            onToggleFavorite={toggleFavorite}
          />

          <CartSummary
            cart={cart}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeFromCart}
            onClear={clearCart}
          />
        </div>
      </main>
    </>
  );
}

export default App;