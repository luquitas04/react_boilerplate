import { jsx as _jsx } from "react/jsx-runtime";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProductCard } from "../ProductCard";
const MOCK_PRODUCT = {
    id: "1",
    name: "Zapatillas Air Max",
    description: "Comodidad y estilo para el día a día.",
    price: 85000,
    currency: "ARS",
    image: "https://example.com/img.jpg",
    stock: 5,
};
function mockFetch(product = MOCK_PRODUCT, ok = true, status = 200) {
    return vi.fn().mockResolvedValue({
        ok,
        status,
        statusText: ok ? "OK" : "Error",
        json: () => Promise.resolve(product),
    });
}
beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch());
});
afterEach(() => {
    vi.unstubAllGlobals();
});
const API_URL = "https://api.test.com";
describe("ProductCard", () => {
    it("muestra skeleton mientras carga", () => {
        vi.stubGlobal("fetch", vi.fn(() => new Promise(() => { })));
        render(_jsx(ProductCard, { apiUrl: API_URL, productId: "1" }));
        const skeletons = document.querySelectorAll(".qc-card__skeleton");
        expect(skeletons.length).toBeGreaterThan(0);
    });
    it("muestra nombre, precio y botón cuando carga correctamente", async () => {
        render(_jsx(ProductCard, { apiUrl: API_URL, productId: "1" }));
        await waitFor(() => screen.getByText("Zapatillas Air Max"));
        expect(screen.getByText("Zapatillas Air Max")).toBeTruthy();
        expect(screen.getByText("Agregar al carrito")).toBeTruthy();
        expect(screen.getByText(/85\.000/)).toBeTruthy();
    });
    it("muestra 'Sin stock' cuando stock === 0", async () => {
        vi.stubGlobal("fetch", mockFetch({ ...MOCK_PRODUCT, stock: 0 }));
        render(_jsx(ProductCard, { apiUrl: API_URL, productId: "1" }));
        await waitFor(() => screen.getByText("Sin stock"));
        expect(screen.getByText("Sin stock")).toBeTruthy();
    });
    it("muestra badge cuando product.badge existe", async () => {
        vi.stubGlobal("fetch", mockFetch({ ...MOCK_PRODUCT, badge: "Nuevo" }));
        render(_jsx(ProductCard, { apiUrl: API_URL, productId: "1" }));
        await waitFor(() => screen.getByText("Nuevo"));
        expect(screen.getByText("Nuevo")).toBeTruthy();
    });
    it("muestra precio con descuento cuando product.discount > 0", async () => {
        vi.stubGlobal("fetch", mockFetch({ ...MOCK_PRODUCT, discount: 20 }));
        render(_jsx(ProductCard, { apiUrl: API_URL, productId: "1" }));
        await waitFor(() => document.querySelector(".qc-card__price--discount"));
        expect(document.querySelector(".qc-card__price--discount")).toBeTruthy();
        expect(document.querySelector(".qc-card__price--original")).toBeTruthy();
    });
    it("llama onAddToCart con el producto al hacer click en el botón", async () => {
        const user = userEvent.setup();
        const onAddToCart = vi.fn();
        render(_jsx(ProductCard, { apiUrl: API_URL, productId: "1", onAddToCart: onAddToCart }));
        await waitFor(() => screen.getByText("Agregar al carrito"));
        await user.click(screen.getByText("Agregar al carrito"));
        expect(onAddToCart).toHaveBeenCalledWith(expect.objectContaining({ id: "1" }));
    });
    it("muestra error y botón reintentar cuando falla el fetch", async () => {
        vi.stubGlobal("fetch", mockFetch({}, false, 500));
        render(_jsx(ProductCard, { apiUrl: API_URL, productId: "1" }));
        await waitFor(() => screen.getByText("Reintentar"));
        expect(screen.getByText("Reintentar")).toBeTruthy();
    });
    it("aplica className extra al elemento raíz", async () => {
        render(_jsx(ProductCard, { apiUrl: API_URL, productId: "1", className: "mi-clase" }));
        await waitFor(() => document.querySelector(".qc-card.mi-clase"));
        expect(document.querySelector(".qc-card.mi-clase")).toBeTruthy();
    });
    it("aplica theme como CSS variables inline", async () => {
        const theme = { "--qc-card-accent": "#ff6b00" };
        render(_jsx(ProductCard, { apiUrl: API_URL, productId: "1", theme: theme }));
        await waitFor(() => screen.getByText("Zapatillas Air Max"));
        const card = document.querySelector(".qc-card");
        expect(card.style.getPropertyValue("--qc-card-accent")).toBe("#ff6b00");
    });
});
