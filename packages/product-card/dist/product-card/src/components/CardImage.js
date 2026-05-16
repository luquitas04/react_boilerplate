import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CLASS_NAMES } from "../constants";
export function CardImage({ product }) {
    return (_jsxs("div", { className: CLASS_NAMES.imageWrapper, children: [_jsx("img", { className: CLASS_NAMES.image, src: product.image, alt: product.name, loading: "lazy" }), product.badge && (_jsx("span", { className: CLASS_NAMES.badge, children: product.badge })), product.discount && product.discount > 0 && (_jsxs("span", { className: CLASS_NAMES.discountBadge, children: ["-", product.discount, "%"] }))] }));
}
