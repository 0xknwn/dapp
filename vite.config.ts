import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import vercel from "vite-plugin-vercel";

// https://vite.dev/config/
export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react(), vercel()],
    server: {
      proxy: {
        "/api/sepolia": {
          target: process.env.VITE_STARKNET_RPC_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/sepolia/, ""),
        },
      },
    },
  });
};
