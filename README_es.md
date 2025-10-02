# 🚀 Proyecto React + Vite + RTK Query + Redux Toolkit

Este proyecto fue generado automáticamente con un script que inicializa un **boilerplate productivo** en **React + TypeScript** usando **Vite**.

Incluye configuración inicial de **Redux Toolkit**, **RTK Query**, un **userSlice** con persistencia en `localStorage`, **mock del endpoint `/api/ping`** en el dev server de Vite y un **estilo base** tipo Vite (gradientes + card).

---

## ✅ Qué trae listo

- ⚡️ Vite (React + TypeScript)
- 🛠 Redux Toolkit + React-Redux
- 📦 RTK Query con `baseApi` y `tagTypes`
- 👤 `userSlice` con `setUser`, `clearUser`, `setToken` (persistencia simple)
- 💾 `storage.ts` (helper para `localStorage`)
- 🔌 **Mock** de `GET /api/ping` en `vite.config.ts` (solo en `npm run dev`)
- 🧩 `App.tsx` de demo usando `usePingQuery()`
- 🎨 Estilos iniciales en `src/index.css` (fondo con gradientes + tarjeta)

---

## ⚙️ Requisitos

- Node.js **18+** (recomendado **22.12+**)
- npm **9+** (o pnpm/yarn, si preferís)

---

## 🧰 Instalación y ejecución del generador (`execute.cjs`)

> Usá estos pasos si **todavía no generaste** el proyecto y querés scaffoldearlo con el script.

1. **Guardá el archivo** `execute.cjs` en una carpeta vacía de trabajo.
2. **Ejecutalo con Node** indicando el nombre del proyecto (ejemplo: `mi-app`):

**macOS / Linux**
```bash
node execute.cjs mi-app
# (opcional) hacerlo ejecutable y correrlo directo
# chmod +x execute.cjs
# ./execute.cjs mi-app
```

**Windows (CMD / PowerShell)**
```powershell
node execute.cjs mi-app
```

3. Al finalizar, ingresá a la carpeta creada y levantá el dev server:
```bash
cd mi-app
npm run dev
```

**¿Qué hace el script?**  
Crea un proyecto Vite (React + TS), instala dependencias, configura **Redux Toolkit + RTK Query**, agrega `userSlice`, `baseApi`, `exampleApi`, estilos base y un **mock de `/api/ping`** para que veas datos inmediatamente en desarrollo.

---

Abrí en el navegador la URL que muestra Vite (por defecto `http://localhost:5173`).

---

## 🌱 Variables de entorno

El proyecto incluye un `.env` con:

```
VITE_API_URL=
```

> Por defecto está **vacío** para no interferir con el mock local.  
> Cuando quieras usar un backend real, ver “Conectar a tu API real” más abajo.

---

## 🧪 Probar el endpoint de ejemplo

- `vite.config.ts` mockea **`GET /api/ping`** en modo dev.
- `exampleApi.ts` llama **`/api/ping`** (mismo origen del dev server).
- `App.tsx` usa `usePingQuery()` y muestra la respuesta.

Al correr `npm run dev`, deberías ver un JSON tipo:

```json
{
  "message": "pong",
  "time": "2025-10-02T12:00:00.000Z"
}
```

---

## 📂 Estructura

```
src/
├─ api/
│  ├─ baseApi.ts        # RTK Query base (fetchBaseQuery + headers)
│  └─ exampleApi.ts     # Endpoint de ejemplo: /api/ping
│
├─ app/
│  ├─ store.ts          # Store de Redux con RTKQ y userSlice
│  └─ hooks.ts          # useAppDispatch + useAppSelector tipados
│
├─ features/
│  └─ user/
│     └─ userSlice.ts   # Slice de usuario con persistencia
│
├─ utils/
│  └─ storage.ts        # Helper de localStorage (get/set/remove)
│
├─ App.tsx              # Componente demo con UI
├─ index.css            # Estilos base (fondo + card + botones)
└─ main.tsx             # Provider Redux + renderizado raíz
```

Archivos raíz relevantes:
- `vite.config.ts`: agrega el **middleware mock** que responde `GET /api/ping`.
- `.env` y `.env.example`: incluyen `VITE_API_URL=` vacío por defecto.

---

## 🔐 Auth vía token

En `baseApi.ts` se agrega el header:

```
Authorization: Bearer <token>
```

si existe `user.token` en el estado.  
Esto te permite proteger endpoints automáticamente cuando seteás un token.

---

## 🔀 Conectar a tu API real (en lugar del mock)

### Opción A — Mismo origen (recomendada)
1. **Desactiva/borra** el middleware mock en `vite.config.ts`.
2. Sirve tu backend en el **mismo origen** o usá un **proxy** en Vite:
   ```ts
   // vite.config.ts
   export default defineConfig({
     plugins: [react()],
     server: {
       port: 5173,
       proxy: {
         "/api": { target: "http://localhost:3000", changeOrigin: true }
       }
     }
   });
   ```
3. Dejá `baseApi.ts` con `baseUrl: ""` y usá rutas tipo `"/api/..."`.
4. `npm run dev`

### Opción B — URL absoluta desde .env
1. Ajustá `baseApi.ts` para leer la variable:
   ```ts
   export const baseQuery = fetchBaseQuery({
     baseUrl: import.meta.env.VITE_API_URL || "",
     ...
   });
   ```
2. Seteá tu `.env`:
   ```
   VITE_API_URL=http://localhost:3000
   ```
3. Mantené tus endpoints con rutas relativas (`"/api/ping"`).

---

## 🧩 Scripts disponibles

- `npm run dev` → modo desarrollo (incluye mock de `/api/ping`)
- `npm run build` → build de producción
- `npm run preview` → previsualizar el build

---

## 📌 Notas

- `userSlice` persiste usuario/token en `localStorage` vía `storage.ts`.
- El mock de `/api/ping` solo aplica en **modo dev** (Vite).
- El estilo inicial (`index.css`) replica un look & feel tipo Vite con gradientes y una card.
