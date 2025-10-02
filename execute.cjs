const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const appName = process.argv[2] || "my-app";
const appPath = path.join(process.cwd(), appName);

function run(cmd, cwd = process.cwd()) {
  console.log(`\n➡️  ${cmd}`);
  execSync(cmd, { stdio: "inherit", cwd, env: { ...process.env, CI: "1" } });
}

function write(file, content) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
  console.log(`📝 ${path.relative(appPath, file)}`);
}

(function main() {
  try {
    if (fs.existsSync(appPath)) {
      console.error(`❌ La carpeta "${appName}" ya existe.`);
      process.exit(1);
    }

    fs.mkdirSync(appPath, { recursive: true });

    write(
      path.join(appPath, "package.json"),
      JSON.stringify(
        {
          name: appName,
          private: true,
          version: "0.0.0",
          type: "module",
          scripts: {
            dev: "vite",
            build: "tsc -b && vite build",
            preview: "vite preview",
          },
          dependencies: {
            react: "^18.3.1",
            "react-dom": "^18.3.1",
            "@reduxjs/toolkit": "^2.2.7",
            "react-redux": "^9.1.2",
          },
          devDependencies: {
            vite: "^5.4.8",
            "@vitejs/plugin-react": "^4.3.2",
            typescript: "^5.6.3",
            "@types/react": "^18.3.10",
            "@types/react-dom": "^18.3.0",
          },
        },
        null,
        2
      )
    );

    write(
      path.join(appPath, "tsconfig.json"),
      `{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true
  },
  "include": ["src"]
}
`
    );

    write(
      path.join(appPath, "tsconfig.node.json"),
      `{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
`
    );

    write(
      path.join(appPath, "vite.config.ts"),
      `import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "mock-api",
      configureServer(server) {
        server.middlewares.use("/api/ping", (_req, res) => {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ message: "pong", time: new Date().toISOString() }));
        });
      },
    },
  ],
  server: { port: 5173 }
});
`
    );

    write(
      path.join(appPath, "index.html"),
      `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>${appName}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`
    );

    write(
      path.join(appPath, "src/main.tsx"),
      `import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
`
    );

    write(
      path.join(appPath, "src/index.css"),
      `:root { --bg: #0b0f18; --panel: rgba(255,255,255,0.06); --border: rgba(255,255,255,0.12); --text: #e6e8ee; --muted: #aab0c0; --accent: #646cff; }
* { box-sizing: border-box }
html, body, #root { height: 100% }
body { margin: 0; background: radial-gradient(600px 300px at 20% 20%, rgba(100,108,255,0.25), transparent 60%), radial-gradient(600px 300px at 80% 0%, rgba(255,180,90,0.18), transparent 60%), radial-gradient(800px 400px at 50% 120%, rgba(100,108,255,0.15), transparent 60%), var(--bg); color: var(--text); font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Arial, "Apple Color Emoji", "Segoe UI Emoji"; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale }
.container { min-height: 100%; display: grid; place-items: center; padding: 24px }
.card { width: min(820px, 92vw); background: linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04)); border: 1px solid var(--border); border-radius: 18px; box-shadow: 0 10px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06); padding: 28px }
.header { display: flex; align-items: center; gap: 14px; margin-bottom: 10px }
.badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 10px; border-radius: 999px; background: rgba(100,108,255,0.12); color: var(--accent); font-size: 12px; border: 1px solid rgba(100,108,255,0.25) }
.title { font-size: 28px; margin: 0; background: linear-gradient(90deg, #fff, #c9ccff 60%, #a1a6ff); -webkit-background-clip: text; background-clip: text; color: transparent }
.sub { color: var(--muted); margin: 0 0 20px }
.section { margin: 18px 0; padding: 16px; border-radius: 12px; border: 1px dashed var(--border); background: var(--panel) }
.row { display: flex; flex-wrap: wrap; align-items: center; gap: 10px }
.code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace; font-size: 13px; background: rgba(0,0,0,0.35); color: #c8d1ff; padding: 10px 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.08) }
.btn { appearance: none; border: 1px solid rgba(255,255,255,0.16); background: linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02)); color: #fff; padding: 10px 14px; border-radius: 12px; font-weight: 600; transition: transform .05s ease, box-shadow .2s ease, background .2s ease; box-shadow: 0 6px 20px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05) }
.btn:hover { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(0,0,0,0.32) }
.btn:active { transform: translateY(0) }
.btn.primary { border-color: rgba(100,108,255,0.5); background: linear-gradient(180deg, rgba(100,108,255,0.5), rgba(100,108,255,0.28)) }
.kv { display: grid; grid-template-columns: 120px 1fr; gap: 8px; margin-top: 12px }
.footer { display: flex; justify-content: space-between; align-items: center; margin-top: 18px; color: var(--muted); font-size: 13px }
.link { color: #c9ccff; text-decoration: none }
.link:hover { text-decoration: underline }
`
    );

    write(
      path.join(appPath, "src/App.tsx"),
      `import { usePingQuery } from "./api/exampleApi";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { setUser, clearUser } from "./features/user/userSlice";

export default function App() {
  const { data, isLoading } = usePingQuery();
  const user = useAppSelector((s) => s.user);
  const dispatch = useAppDispatch();

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <span className="badge">Vite + React + RTK Query</span>
          <h1 className="title">Boilerplate listo para trabajar</h1>
        </div>
        <p className="sub">Incluye Redux Toolkit, RTK Query, un user slice con persistencia simple y baseQuery con token.</p>

        <div className="section">
          <h3 style={{marginTop:0}}>Estado de usuario</h3>
          <pre className="code">{JSON.stringify(user, null, 2)}</pre>
          <div className="row" style={{marginTop:12}}>
            <button
              className="btn primary"
              onClick={() =>
                dispatch(
                  setUser({
                    id: "123",
                    fullName: "Ada Lovelace",
                    email: "ada@example.com",
                    token: "fake-jwt-token"
                  })
                )
              }
            >
              Set user
            </button>
            <button className="btn" onClick={() => dispatch(clearUser())}>
              Clear user
            </button>
          </div>
        </div>

        <div className="section">
          <h3 style={{marginTop:0}}>Ping de ejemplo</h3>
          {isLoading ? (
            <pre className="code">Cargando…</pre>
          ) : (
            <pre className="code">{JSON.stringify(data, null, 2)}</pre>
          )}
          <div className="kv">
            <div className="muted">Endpoint</div>
            <div className="code">GET /api/ping</div>
          </div>
        </div>

        <div className="footer">
          <span>Editá <span className="code">src/App.tsx</span> para empezar</span>
          <a className="link" href="https://redux-toolkit.js.org/rtk-query/overview" target="_blank" rel="noreferrer">RTK Query Docs ↗</a>
        </div>
      </div>
    </div>
  );
}
`
    );

    write(
      path.join(appPath, "src/app/store.ts"),
      `import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import { userReducer } from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
`
    );

    write(
      path.join(appPath, "src/app/hooks.ts"),
      `import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
`
    );

    write(
      path.join(appPath, "src/utils/storage.ts"),
      `export const storage = {
  get<T>(key: string, fallback: T | null = null): T | null {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  },
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch {}
  },
};
`
    );

    write(
      path.join(appPath, "src/features/user/userSlice.ts"),
      `import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { storage } from "../../utils/storage";

export interface UserState {
  id: string | null;
  fullName: string | null;
  email: string | null;
  token: string | null;
}

const STORAGE_KEY = "app:user";

const initialState: UserState =
  storage.get<UserState>(STORAGE_KEY, {
    id: null,
    fullName: null,
    email: null,
    token: null,
  }) || {
    id: null,
    fullName: null,
    email: null,
    token: null,
  };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.id = action.payload.id;
      state.fullName = action.payload.fullName;
      state.email = action.payload.email;
      state.token = action.payload.token;
      storage.set(STORAGE_KEY, state);
    },
    clearUser(state) {
      state.id = null;
      state.fullName = null;
      state.email = null;
      state.token = null;
      storage.remove(STORAGE_KEY);
    },
    setToken(state, action: PayloadAction<string | null>) {
      state.token = action.payload;
      storage.set(STORAGE_KEY, state);
    },
  },
});

export const { setUser, clearUser, setToken } = userSlice.actions;
export const userReducer = userSlice.reducer;
`
    );

    write(
      path.join(appPath, "src/api/baseApi.ts"),
      `import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../app/store";

export const baseQuery = fetchBaseQuery({
  baseUrl: "",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.token;
    if (token) headers.set("Authorization", \`Bearer \${token}\`);
    headers.set("Accept", "application/json");
    return headers;
  },
  credentials: "include",
});

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Example"],
  endpoints: () => ({}),
});
`
    );

    write(
      path.join(appPath, "src/api/exampleApi.ts"),
      `import { baseApi } from "./baseApi";

export interface PingResponse {
  message: string;
  time: string;
}

export const exampleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    ping: builder.query<PingResponse, void>({
      query: () => ({ url: "/api/ping" }),
      providesTags: ["Example"],
    }),
  }),
  overrideExisting: false,
});

export const { usePingQuery } = exampleApi;
`
    );

    write(
      path.join(appPath, ".env"),
      `VITE_API_URL=
`
    );
    write(
      path.join(appPath, ".env.example"),
      `VITE_API_URL=
`
    );

    run("npm install", appPath);

    console.log(`\n✅ Proyecto generado en: ${appPath}`);
    console.log(`\nSiguientes pasos:
cd ${appName}
npm run dev
`);
  } catch (err) {
    console.error("\n❌ Error:", err?.message || err);
    process.exit(1);
  }
})();
