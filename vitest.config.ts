import path from "path"
import { defineConfig } from "vitest/config"
import dotenv from "dotenv"

dotenv.config({ path: ".env" })

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ["./test/setup.ts"],
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
