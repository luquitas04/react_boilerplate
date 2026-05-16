import { useEffect } from "react";
import { ProductCard } from "@quadcore/product-card";
import "@quadcore/product-card/styles";

const MOCK_PRODUCT = {
  id: "1",
  name: "Zapatillas Air Max",
  description: "Comodidad y estilo para el día a día.",
  price: 85000,
  currency: "ARS",
  image: "https://placehold.co/400x300/646cff/fff?text=Producto",
  stock: 5,
  badge: "Nuevo",
  discount: 15,
};

const apiUrl = import.meta.env.VITE_API_URL ?? "http://localhost:__mock__";

// Intercept fetch in mock mode (no VITE_API_URL set)
const isMock = !import.meta.env.VITE_API_URL;
if (isMock) {
  const originalFetch = window.fetch.bind(window);
  window.fetch = (input, init) => {
    const url = typeof input === "string" ? input : input instanceof URL ? input.href : (input as Request).url;
    if (url.includes("/api/products/")) {
      return Promise.resolve(
        new Response(JSON.stringify(MOCK_PRODUCT), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );
    }
    return originalFetch(input, init);
  };
}

export default function App() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", padding: "2rem", background: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ marginBottom: "0.25rem" }}>@quadcore/product-card</h1>
      <p style={{ color: "#666", marginTop: 0, marginBottom: "2rem" }}>
        {isMock ? "Modo mock — sin backend" : `API: ${apiUrl}`}
      </p>

      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap", alignItems: "flex-start" }}>

        {/* Variante 1: default */}
        <div>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Default</p>
          <ProductCard
            apiUrl={apiUrl}
            productId="1"
            onAddToCart={(p) => alert(`Agregado: ${p.name}`)}
          />
        </div>

        {/* Variante 2: tema personalizado */}
        <div>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Tema naranja + sin radius</p>
          <ProductCard
            apiUrl={apiUrl}
            productId="1"
            theme={{
              "--qc-card-accent": "#ff6b00",
              "--qc-card-btn-bg": "#ff6b00",
              "--qc-card-radius": "0px",
            }}
            onAddToCart={(p) => alert(`Agregado: ${p.name}`)}
          />
        </div>

        {/* Variante 3: slots personalizados */}
        <div>
          <p style={{ fontWeight: 600, marginBottom: "0.5rem" }}>Slots custom</p>
          <ProductCard
            apiUrl={apiUrl}
            productId="1"
            renderPrice={(p) => (
              <div style={{ fontSize: "1.5rem", color: "green" }}>
                ${p.price.toLocaleString()}
              </div>
            )}
            renderButton={(p, onClick) => (
              <button
                onClick={onClick}
                style={{
                  background: "black",
                  color: "white",
                  width: "100%",
                  padding: "0.75rem",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                COMPRAR AHORA
              </button>
            )}
            onAddToCart={(p) => alert(`Agregado: ${p.name}`)}
          />
        </div>

      </div>

      {/* Bloque CSS de referencia */}
      <div style={{ marginTop: "3rem", maxWidth: 600 }}>
        <h2 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
          Clases para personalizar desde tu CSS
        </h2>
        <pre style={{
          background: "#1e1e1e",
          color: "#d4d4d4",
          padding: "1.25rem",
          borderRadius: "8px",
          fontSize: "0.82rem",
          lineHeight: 1.7,
          overflowX: "auto",
        }}>{`.qc-card { }
.qc-card__image { }
.qc-card__title { }
.qc-card__description { }
.qc-card__price { }
.qc-card__button { }`}</pre>
      </div>
    </div>
  );
}
