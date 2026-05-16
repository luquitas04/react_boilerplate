import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "@quadcore/core";
import { CLASS_NAMES } from "../constants";
export function CardButton({ product: _product, disabled, onClick }) {
    return (_jsx("button", { className: cn(CLASS_NAMES.button, disabled && CLASS_NAMES.buttonDisabled), disabled: disabled, onClick: (e) => {
            e.stopPropagation();
            onClick();
        }, children: disabled ? "Sin stock" : "Agregar al carrito" }));
}
