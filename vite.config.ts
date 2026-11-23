import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: { base: "/restaurant/" },
  nitro: false,
  tanstackStart: {
    server: { entry: "server" },
    prerender: { enabled: true, failOnError: true },
    pages: [{ path: "/" }],
  },
});
