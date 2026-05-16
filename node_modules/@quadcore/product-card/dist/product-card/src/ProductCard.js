import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from "@quadcore/core";
import { CLASS_NAMES } from "./constants";
import { useProduct } from "./hooks/useProduct";
import { CardImage } from "./components/CardImage";
import { CardPrice } from "./components/CardPrice";
import { CardButton } from "./components/CardButton";
import "./styles/product-card.css";
export function ProductCard({ apiUrl, productId, theme, className, onAddToCart, onCardClick, renderPrice, renderButton, }) {
    const themeStyle = theme
        ? Object.fromEntries(Object.entries(theme))
        : undefined;
    const { data: product, loading, error, refetch } = useProduct(apiUrl, productId);
    if (loading) {
        return (_jsxs("div", { className: cn(CLASS_NAMES.root, className), style: themeStyle, children: [_jsx("div", { className: CLASS_NAMES.imageWrapper, children: _jsx("div", { className: CLASS_NAMES.skeleton, style: { width: "100%", height: "100%" } }) }), _jsxs("div", { className: CLASS_NAMES.body, style: { gap: "0.75rem" }, children: [_jsx("div", { className: CLASS_NAMES.skeleton, style: { height: 18, width: "70%" } }), _jsx("div", { className: CLASS_NAMES.skeleton, style: { height: 14, width: "90%" } }), _jsx("div", { className: CLASS_NAMES.skeleton, style: { height: 14, width: "60%" } }), _jsx("div", { className: CLASS_NAMES.skeleton, style: { height: 40, marginTop: 8 } })] })] }));
    }
    if (error || !product) {
        return (_jsx("div", { className: cn(CLASS_NAMES.root, className), style: themeStyle, children: _jsxs("p", { className: CLASS_NAMES.error, children: [error ?? "Producto no encontrado", _jsx("button", { onClick: refetch, style: { marginLeft: 8, cursor: "pointer" }, children: "Reintentar" })] }) }));
    }
    const outOfStock = product.stock === 0;
    return (_jsxs("div", { className: cn(CLASS_NAMES.root, className), style: themeStyle, onClick: () => onCardClick?.(product), role: onCardClick ? "button" : undefined, children: [_jsx(CardImage, { product: product }), _jsxs("div", { className: CLASS_NAMES.body, children: [_jsx("h3", { className: CLASS_NAMES.title, children: product.name }), _jsx("p", { className: CLASS_NAMES.description, children: product.description }), renderPrice ? (renderPrice(product)) : (_jsx(CardPrice, { product: product })), renderButton ? (renderButton(product, () => onAddToCart?.(product))) : (_jsx(CardButton, { product: product, disabled: outOfStock, onClick: () => onAddToCart?.(product) }))] })] }));
}
