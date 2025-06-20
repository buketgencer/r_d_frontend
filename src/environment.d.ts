// TypeScript IntelliSense for VITE_ .env variables.
// VITE_ prefixed variables are exposed to the client while non-VITE_ variables aren't
// https://vitejs.dev/guide/env-and-mode.html

/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_APP_TITLE: string
	readonly VITE_API_BASE_URL: string
	readonly VITE_API_TIMEOUT: string
	// Add more env variables as needed...
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
