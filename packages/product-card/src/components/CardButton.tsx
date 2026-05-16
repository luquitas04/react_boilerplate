import { cn } from "@quadcore/core";
import { CLASS_NAMES } from "../constants";
import type { Product } from "../types";

interface Props {
  product: Product;
  disabled: boolean;
  onClick: () => void;
}

export function CardButton({ product: _product, disabled, onClick }: Props) {
  return (
    <button
      className={cn(
        CLASS_NAMES.button,
        disabled && CLASS_NAMES.buttonDisabled
      )}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {disabled ? "Sin stock" : "Agregar al carrito"}
    </button>
  );
}
