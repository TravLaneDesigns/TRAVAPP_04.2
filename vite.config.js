import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fartV1Bridge } from "./build/fartV1Bridge.js";

export default defineConfig({
  plugins: [fartV1Bridge(), react()],
  base: "./",
});
