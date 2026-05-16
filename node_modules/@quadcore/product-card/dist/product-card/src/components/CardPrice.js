import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CLASS_NAMES } from "../constants";
export function CardPrice({ product }) {
    const formatter = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: product.currency || "ARS",
        minimumFractionDigits: 0,
    });
    if (product.discount && product.discount > 0) {
        const original = product.price;
        const discounted = original * (1 - product.discount / 100);
        return (_jsxs("div", { className: CLASS_NAMES.priceWrapper, children: [_jsx("span", { className: `${CLASS_NAMES.price} ${CLASS_NAMES.priceDiscount}`, children: formatter.format(discounted) }), _jsx("span", { className: CLASS_NAMES.priceOriginal, children: formatter.format(original) })] }));
    }
    return (_jsx("div", { className: CLASS_NAMES.priceWrapper, children: _jsx("span", { className: CLASS_NAMES.price, children: formatter.format(product.price) }) }));
}
