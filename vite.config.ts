import path from "path"
import react from "@vitejs/plugin-react"
import { ghPages } from "vite-plugin-gh-pages"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), ghPages()],
  base: "/AgroCurrent",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})