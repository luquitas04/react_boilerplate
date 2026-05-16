import { cn } from "@quadcore/core";
import { CLASS_NAMES } from "./constants";
import { useProduct } from "./hooks/useProduct";
import { CardImage } from "./components/CardImage";
import { CardPrice } from "./components/CardPrice";
import { CardButton } from "./components/CardButton";
import type { ProductCardProps } from "./types";
import "./styles/product-card.css";

export function ProductCard({
  apiUrl,
  productId,
  theme,
  className,
  onAddToCart,
  onCardClick,
  renderPrice,
  renderButton,
}: ProductCardProps) {
  const themeStyle = theme
    ? (Object.fromEntries(Object.entries(theme)) as React.CSSProperties)
    : undefined;

  const { data: product, loading, error, refetch } = useProduct(apiUrl, productId);

  if (loading) {
    return (
      <div className={cn(CLASS_NAMES.root, className)} style={themeStyle}>
        <div className={CLASS_NAMES.imageWrapper}>
          <div className={CLASS_NAMES.skeleton} style={{ width: "100%", height: "100%" }} />
        </div>
        <div className={CLASS_NAMES.body} style={{ gap: "0.75rem" }}>
          <div className={CLASS_NAMES.skeleton} style={{ height: 18, width: "70%" }} />
          <div className={CLASS_NAMES.skeleton} style={{ height: 14, width: "90%" }} />
          <div className={CLASS_NAMES.skeleton} style={{ height: 14, width: "60%" }} />
          <div className={CLASS_NAMES.skeleton} style={{ height: 40, marginTop: 8 }} />
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className={cn(CLASS_NAMES.root, className)} style={themeStyle}>
        <p className={CLASS_NAMES.error}>
          {error ?? "Producto no encontrado"}
          <button onClick={refetch} style={{ marginLeft: 8, cursor: "pointer" }}>
            Reintentar
          </button>
        </p>
      </div>
    );
  }

  const outOfStock = product.stock === 0;

  return (
    <div
      className={cn(CLASS_NAMES.root, className)}
      style={themeStyle}
      onClick={() => onCardClick?.(product)}
      role={onCardClick ? "button" : undefined}
    >
      <CardImage product={product} />

      <div className={CLASS_NAMES.body}>
        <h3 className={CLASS_NAMES.title}>{product.name}</h3>
        <p className={CLASS_NAMES.description}>{product.description}</p>

        {renderPrice ? (
          renderPrice(product)
        ) : (
          <CardPrice product={product} />
        )}

        {renderButton ? (
          renderButton(product, () => onAddToCart?.(product))
        ) : (
          <CardButton
            product={product}
            disabled={outOfStock}
            onClick={() => onAddToCart?.(product)}
          />
        )}
      </div>
    </div>
  );
}
