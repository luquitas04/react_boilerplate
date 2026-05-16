import { CLASS_NAMES } from "../constants";
import type { Product } from "../types";

export function CardImage({ product }: { product: Product }) {
  return (
    <div className={CLASS_NAMES.imageWrapper}>
      <img
        className={CLASS_NAMES.image}
        src={product.image}
        alt={product.name}
        loading="lazy"
      />
      {product.badge && (
        <span className={CLASS_NAMES.badge}>{product.badge}</span>
      )}
      {product.discount && product.discount > 0 && (
        <span className={CLASS_NAMES.discountBadge}>-{product.discount}%</span>
      )}
    </div>
  );
}
