import { CLASS_NAMES } from "../constants";
import type { Product } from "../types";

export function CardPrice({ product }: { product: Product }) {
  const formatter = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: product.currency || "ARS",
    minimumFractionDigits: 0,
  });

  if (product.discount && product.discount > 0) {
    const original = product.price;
    const discounted = original * (1 - product.discount / 100);
    return (
      <div className={CLASS_NAMES.priceWrapper}>
        <span className={`${CLASS_NAMES.price} ${CLASS_NAMES.priceDiscount}`}>
          {formatter.format(discounted)}
        </span>
        <span className={CLASS_NAMES.priceOriginal}>
          {formatter.format(original)}
        </span>
      </div>
    );
  }

  return (
    <div className={CLASS_NAMES.priceWrapper}>
      <span className={CLASS_NAMES.price}>
        {formatter.format(product.price)}
      </span>
    </div>
  );
}
