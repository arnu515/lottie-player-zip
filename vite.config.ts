import * as path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

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
			}
		}
	},
	plugins: [react()]
})
