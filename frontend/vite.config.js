import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  define: {
    // Ensure environment variables are properly defined
    "import.meta.env.VITE_API_URL": JSON.stringify(
      mode === "production" ? "/api" : "http://localhost:3000/api"
    ),
  },
}));
