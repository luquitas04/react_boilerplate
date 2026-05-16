import type { QuadcoreConfig } from "@quadcore/core";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  stock: number;
  badge?: string;
  discount?: number;
}

export interface ProductCardProps extends QuadcoreConfig {
  productId: string;
  onAddToCart?: (product: Product) => void;
  onCardClick?: (product: Product) => void;
  renderPrice?: (product: Product) => React.ReactNode;
  renderButton?: (product: Product, onClick: () => void) => React.ReactNode;
}
