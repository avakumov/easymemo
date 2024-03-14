import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: '0.0.0.0',
		port: 8000,
	},
	preview: {
		port: 8000,
	},
	build: {
		rollupOptions: {
			external: ['react-markdown', 'remark-gfm', '@mdxeditor/editor'],
		},
	},
});
