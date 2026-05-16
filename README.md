# @quadcore

Librería privada de componentes de negocio para React.
Cada paquete incluye UI + lógica + llamadas a la API ya conectadas.
El cliente instala el paquete, pasa su `apiUrl` y el componente funciona completo.

---

## ¿Qué es @quadcore?

Los componentes de @quadcore son autónomos: no necesitan Redux, contextos globales ni configuración adicional.
El estado vive dentro del componente, los datos vienen de la API del cliente y la UI es completamente personalizable.

---

## Instalación

```bash
npm install @quadcore/product-card
# Requiere acceso al registry privado (ver sección .npmrc)
```

Configurar el registry en `.npmrc` del proyecto del cliente:

```
@quadcore:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
```

---

## Uso básico

```tsx
import { ProductCard } from "@quadcore/product-card";
import "@quadcore/product-card/styles";

<ProductCard
  apiUrl="https://api.micliente.com"
  productId="123"
  onAddToCart={(product) => console.log(product)}
/>
```

El componente llama automáticamente a `GET {apiUrl}/api/products/123` y renderiza el resultado.

---

## API del componente

| Prop | Tipo | Default | Descripción |
|---|---|---|---|
| `apiUrl` | `string` | — | Base URL de la API del cliente |
| `productId` | `string` | — | ID del producto a cargar |
| `onAddToCart` | `(product: Product) => void` | — | Callback al hacer click en el botón |
| `onCardClick` | `(product: Product) => void` | — | Callback al hacer click en la card |
| `theme` | `Record<string, string>` | — | Overrides de CSS variables aplicados inline |
| `className` | `string` | — | Clase CSS extra agregada al elemento raíz |
| `locale` | `string` | `"es-AR"` | Locale para formateo de precios |
| `renderPrice` | `(product: Product) => ReactNode` | — | Slot para reemplazar el bloque de precio |
| `renderButton` | `(product: Product, onClick: () => void) => ReactNode` | — | Slot para reemplazar el botón |

---

## Personalización — 3 capas

### Capa 1 — CSS variables

Sobreescribir variables en tu CSS global o por componente:

```css
:root {
  --qc-card-accent: #ff6b00;
  --qc-card-btn-bg: #ff6b00;
  --qc-card-radius: 0px;
}
```

Variables disponibles:

| Variable | Descripción |
|---|---|
| `--qc-card-bg` | Fondo de la card |
| `--qc-card-border` | Color del borde |
| `--qc-card-radius` | Border radius de la card |
| `--qc-card-shadow` | Sombra de la card |
| `--qc-card-accent` | Color de acento (badge, highlights) |
| `--qc-card-title-color` | Color del título |
| `--qc-card-text-color` | Color del texto descriptivo |
| `--qc-card-price-color` | Color del precio |
| `--qc-card-btn-bg` | Fondo del botón |
| `--qc-card-btn-text` | Texto del botón |
| `--qc-card-btn-radius` | Border radius del botón |

También se pueden pasar via la prop `theme`:

```tsx
<ProductCard
  apiUrl="https://api.micliente.com"
  productId="123"
  theme={{
    "--qc-card-accent": "#ff6b00",
    "--qc-card-btn-bg": "#ff6b00",
    "--qc-card-radius": "0px",
  }}
/>
```

---

### Capa 2 — Clases predecibles

Todos los elementos tienen clases con prefijo `qc-` para no chocar con el CSS existente del cliente.

| Clase | Elemento |
|---|---|
| `qc-card` | Elemento raíz de la card |
| `qc-card__image-wrapper` | Contenedor de la imagen |
| `qc-card__image` | Tag `<img>` del producto |
| `qc-card__badge` | Badge de categoría (ej: "Nuevo") |
| `qc-card__discount-badge` | Badge de descuento (ej: "-15%") |
| `qc-card__body` | Sección de contenido debajo de la imagen |
| `qc-card__title` | Nombre del producto |
| `qc-card__description` | Descripción corta |
| `qc-card__price-wrapper` | Contenedor del precio |
| `qc-card__price` | Precio principal |
| `qc-card__price--original` | Precio tachado cuando hay descuento |
| `qc-card__price--discount` | Precio con descuento aplicado |
| `qc-card__button` | Botón "Agregar al carrito" |
| `qc-card__button--disabled` | Botón cuando no hay stock |
| `qc-card__skeleton` | Placeholder animado durante la carga |
| `qc-card__error` | Mensaje de error |

Las clases también están disponibles via import para autocomplete:

```tsx
import { CLASS_NAMES } from "@quadcore/product-card";

// CLASS_NAMES.button === "qc-card__button"
```

---

### Capa 3 — Slots (renderPrice, renderButton)

Reemplazar partes de la UI con componentes propios:

```tsx
<ProductCard
  apiUrl="https://api.micliente.com"
  productId="123"
  renderPrice={(product) => (
    <div style={{ fontSize: "1.5rem", color: "green" }}>
      ${product.price.toLocaleString()}
    </div>
  )}
  renderButton={(product, onClick) => (
    <button
      onClick={onClick}
      style={{ background: "black", color: "white", width: "100%", padding: "0.75rem", border: "none" }}
    >
      COMPRAR AHORA
    </button>
  )}
  onAddToCart={(product) => agregarAlCarrito(product)}
/>
```

---

## Lo que espera de la API

```
GET {apiUrl}/api/products/{productId}
```

**Respuesta 200:**

```json
{
  "id": "123",
  "name": "Nombre del producto",
  "description": "Descripción corta",
  "price": 85000,
  "currency": "ARS",
  "image": "https://cdn.micliente.com/producto.jpg",
  "stock": 5,
  "badge": "Nuevo",
  "discount": 15
}
```

`badge` y `discount` son opcionales.
Si `stock === 0`, el botón muestra "Sin stock" y queda deshabilitado.
Si `discount > 0`, se muestra el precio tachado y el precio con descuento calculado.

---

## Tests

```bash
# Todos los paquetes
npm run test

# Solo core
npm run test --filter=@quadcore/core

# Solo product-card
npm run test --filter=@quadcore/product-card
```

Total: 24 tests (12 en core, 12 en product-card).

---

## Ejemplo local

```bash
cd examples/basic
npm run dev
# → http://localhost:5173
```

El ejemplo levanta en modo mock (sin backend) si no hay `VITE_API_URL` en el entorno.
Para conectar a una API real, crear `examples/basic/.env`:

```
VITE_API_URL=http://localhost:3000
```

---

## Publicar al registry privado

```bash
npm publish --workspace=packages/product-card
```

Requiere `NODE_AUTH_TOKEN` configurado en el entorno.

---

## Próximos paquetes

- `@quadcore/tickets` — gestión de tickets de soporte
- `@quadcore/ecommerce` — listados, carrito y checkout
- `@quadcore/panel-admin` — panel de administración embebible
