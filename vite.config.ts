import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";
import gateway from "./src/config/gateway.json";

// 从 gateway.json 动态生成 H5 反向代理配置
const currentEnvConfig = gateway.gatewayConfig[gateway.runtimeEnv as keyof typeof gateway.gatewayConfig];
const proxy: Record<string, object> = {};
for (const [name, target] of Object.entries(currentEnvConfig)) {
  proxy[`/${name}`] = {
    target,
    changeOrigin: true,
    rewrite: (path: string) => path.replace(new RegExp(`^/${name}`), ''),
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [uni()],
  server: {
    proxy,
  },
});
