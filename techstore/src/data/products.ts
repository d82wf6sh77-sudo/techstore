import type { Product } from "../types/Product";

export const products: Product[] = [
  {
    id: 1,
    name: "Teclado mecánico",
    price: 245000,
    category: "Accesorios",
    emoji: "⌨️",
    stock: 5,
  },
  {
    id: 2,
    name: "Mouse inalámbrico",
    price: 120000,
    category: "Accesorios",
    emoji: "🖱️",
    stock: 8,
  },
  {
    id: 3,
    name: "Monitor 24 pulgadas",
    price: 780000,
    category: "Pantallas",
    emoji: "🖥️",
    stock: 3,
  },
  {
    id: 4,
    name: "Audífonos Bluetooth",
    price: 190000,
    category: "Audio",
    emoji: "🎧",
    stock: 6,
  },
  {
    id: 5,
    name: "Micrófono USB",
    price: 275000,
    category: "Audio",
    emoji: "🎙️",
    stock: 0,
  },
  {
    id: 6,
    name: "Webcam Full HD",
    price: 220000,
    category: "Video",
    emoji: "📷",
    stock: 4,
  },
];