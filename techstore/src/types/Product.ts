export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  emoji: string;
  stock: number;
  description?: string;
}