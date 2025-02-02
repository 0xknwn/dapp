import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/message": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
      "/rpc": {
        target: "http://localhost:5050",
        changeOrigin: true,
      },
    },
  },
});
