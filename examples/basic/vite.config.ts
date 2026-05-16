import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: "@quadcore/product-card/styles",
        replacement: path.resolve(__dirname, "../../packages/product-card/src/styles/product-card.css"),
      },
      {
        find: "@quadcore/core/styles",
        replacement: path.resolve(__dirname, "../../packages/core/src/styles/base.css"),
      },
      {
        find: "@quadcore/product-card",
        replacement: path.resolve(__dirname, "../../packages/product-card/index.ts"),
      },
      {
        find: "@quadcore/core",
        replacement: path.resolve(__dirname, "../../packages/core/src/index.ts"),
      },
    ],
  },
});
