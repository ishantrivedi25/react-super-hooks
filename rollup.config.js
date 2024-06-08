import { defineConfig } from "rollup";
import terser from '@rollup/plugin-terser';
import typescript from "@rollup/plugin-typescript";

export default defineConfig({
    input: "index.ts",
    output: {
        dir: "dist",
        format: "es",
        name: "react-super-hooks",
    },
    external: ["react", "react-dom"],
    plugins: [typescript({ tsconfig: "tsconfig.json" }), terser()],
});