import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Shim the global variable for browser compatibility
  define: {
    "process.env": {},
    global: {},
  },
});
