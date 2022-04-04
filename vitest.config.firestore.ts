import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  publicDir: path.resolve(__dirname, "./static"),
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "./src") }],
  },
  plugins: [react],
  test: {
    globals: true,
    setupFiles: "./test/setup.ts",
    include: ["./test/**/*.db.test.ts"],
  },
});
