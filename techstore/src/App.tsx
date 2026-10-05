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

  const categories = [...new Set(products.map((product) => product.category))];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "Todos" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalUnits = cart.reduce((sum, item) => sum + item.quantity, 0);

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
      <Header cartCount={totalUnits} />

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
          onSearchChange={setSearch}
          onCategoryChange={setSelectedCategory}
        />

        <div className="shop-layout">
          <ProductList
            products={filteredProducts}
            cart={cart}
            onAdd={addToCart}
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