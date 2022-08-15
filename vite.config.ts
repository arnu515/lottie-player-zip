import * as path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import typescript from "rollup-plugin-typescript2"

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, "src/lib/index.tsx"),
			name: "Lottie Player ZIP",
			fileName: format => `lottie-player-zip.${format}.js`
		},
		rollupOptions: {
			external: ["react", "react-dom", "@lottiefiles/lottie-player", "@zip.js/zip.js"],
			output: {
				globals: {
					react: "React"
				}
			},
			plugins: [
				typescript({
					tsconfig: path.resolve(__dirname, "tsconfig.json"),
					tsconfigOverride: {
						compilerOptions: {
							sourceMap: false,
							declaration: true,
							declarationMap: true,
							emitDeclarationOnly: true
						},
						include: ["src/lib"]
					}
				})
			]
		}
	},
	plugins: [react()]
})
