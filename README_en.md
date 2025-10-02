# 🚀 React + Vite + RTK Query + Redux Toolkit Project

This project was automatically generated with a script that bootstraps a **productive boilerplate** in **React + TypeScript** using **Vite**.

It includes initial configuration for **Redux Toolkit**, **RTK Query**, a **userSlice** with persistence in `localStorage`, a **mock for the `/api/ping` endpoint** in Vite’s dev server, and a **Vite-style base UI** (gradients + card).

---

## ✅ What’s Included

- ⚡️ Vite (React + TypeScript)
- 🛠 Redux Toolkit + React-Redux
- 📦 RTK Query with `baseApi` and `tagTypes`
- 👤 `userSlice` with `setUser`, `clearUser`, `setToken` (simple persistence)
- 💾 `storage.ts` (helper for `localStorage`)
- 🔌 **Mock** of `GET /api/ping` in `vite.config.ts` (dev only)
- 🧩 Demo `App.tsx` using `usePingQuery()`
- 🎨 Initial styles in `src/index.css` (background + card + buttons)

---

## ⚙️ Requirements

- Node.js **18+** (recommended **22.12+**)
- npm **9+** (or pnpm/yarn if preferred)

---

## 🧰 Installation & Running the Generator (`execute.cjs`)

> Use these steps if you **haven’t created the project yet** and want to scaffold it with the script.

1. Save the `execute.cjs` file in an empty working folder.
2. Run it with Node, specifying the project name (e.g., `my-app`).

**macOS / Linux**
```bash
node execute.cjs my-app
# (optional) make it executable and run directly
# chmod +x execute.cjs
# ./execute.cjs my-app
```

**Windows (CMD / PowerShell)**
```powershell
node execute.cjs my-app
```

3. After it finishes, go into the created folder and start the dev server:
```bash
cd my-app
npm run dev
```

**What does the script do?**  
It creates a Vite project (React + TS), installs dependencies, sets up **Redux Toolkit + RTK Query**, adds `userSlice`, `baseApi`, `exampleApi`, base styles, and a **mock of `/api/ping`** so you immediately see data during development.

---

Open the browser at the URL shown by Vite (default `http://localhost:5173`).

---

## 🌱 Environment Variables

The project comes with a `.env` file containing:

```
VITE_API_URL=
```

> By default it’s **empty** so it doesn’t interfere with the local mock.  
> When you want to connect to a real backend, see “Connecting to your real API” below.

---

## 🧪 Testing the Example Endpoint

- `vite.config.ts` mocks **`GET /api/ping`** in dev mode.
- `exampleApi.ts` calls **`/api/ping`** (same origin as the dev server).
- `App.tsx` uses `usePingQuery()` and renders the response.

Running `npm run dev` should show a JSON like:

```json
{
  "message": "pong",
  "time": "2025-10-02T12:00:00.000Z"
}
```

---

## 📂 Project Structure

```
src/
├─ api/
│  ├─ baseApi.ts        # RTK Query base (fetchBaseQuery + headers)
│  └─ exampleApi.ts     # Example endpoint: /api/ping
│
├─ app/
│  ├─ store.ts          # Redux store with RTKQ + userSlice
│  └─ hooks.ts          # Typed useAppDispatch + useAppSelector
│
├─ features/
│  └─ user/
│     └─ userSlice.ts   # User slice with persistence
│
├─ utils/
│  └─ storage.ts        # LocalStorage helper (get/set/remove)
│
├─ App.tsx              # Demo UI component
├─ index.css            # Base styles (background + card + buttons)
└─ main.tsx             # Redux Provider + root render
```

Root files worth noting:
- `vite.config.ts`: includes the **mock middleware** responding to `GET /api/ping`.
- `.env` and `.env.example`: include `VITE_API_URL=` empty by default.

---

## 🔐 Token-based Auth

In `baseApi.ts`, the following header is added automatically:

```
Authorization: Bearer <token>
```

if `user.token` exists in the Redux state.  
This allows endpoints to be protected once a user logs in.

---

## 🔀 Connecting to Your Real API (instead of the mock)

### Option A — Same origin (recommended)
1. **Remove/disable** the mock middleware in `vite.config.ts`.
2. Serve your backend on the **same origin** (or use a **proxy** in Vite):
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
3. Keep `baseApi.ts` with `baseUrl: ""` and endpoints like `"/api/..."`.
4. `npm run dev`

### Option B — Absolute URL from .env
1. Adjust `baseApi.ts` to read the variable:
   ```ts
   export const baseQuery = fetchBaseQuery({
     baseUrl: import.meta.env.VITE_API_URL || "",
     ...
   });
   ```
2. Set `.env`:
   ```
   VITE_API_URL=http://localhost:3000
   ```
3. Ensure queries use relative routes (`"/api/ping"`).

---

## 🧩 Available Scripts

- `npm run dev` → dev mode (includes `/api/ping` mock)
- `npm run build` → production build
- `npm run preview` → preview production build

---

## 📌 Notes

- `userSlice` persists user/token in `localStorage` via `storage.ts`.
- The `/api/ping` mock is dev-only (Vite).
- Initial styles (`index.css`) provide a Vite-like look with gradients + card.
