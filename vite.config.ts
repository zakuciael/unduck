import { resolve, join } from "node:path";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import transformPlugin from "vite-plugin-transform";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      transformPlugin({
        tStart: "%{",
        tEnd: "}%",
        replaceFiles: [resolve(join(__dirname, "./dist/opensearch.xml"))],
        replace: {
          VITE_PUBLIC_URL: env.VITE_PUBLIC_URL,
        },
      }),
      VitePWA({
        registerType: "autoUpdate",
      }),
    ],
    server: {
      port: parseInt(env.PORT),
    }
  };
});
