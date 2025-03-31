import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      usePolling: true, // 使用轮询监视文件变化
    },
    host: "0.0.0.0", // 这里指定了服务器主机为 0.0.0.0，允许通过局域网访问
    port: 5173, // 可以指定你想要使用的端口
    proxy: {
      "/api": {
        target: "http://127.0.0.1:8000", // 代理的目标地址
        changeOrigin: true, // 是否更改请求源
        rewrite: (path) => {
          console.log("Original path:", path);
          const rewritten = path.replace(/^\/api/, "");
          console.log("Rewritten path:", rewritten);
          return rewritten;
        },
      },
    },
  },
});
