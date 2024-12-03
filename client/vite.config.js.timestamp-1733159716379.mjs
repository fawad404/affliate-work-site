// vite.config.js
import { defineConfig } from "file:///C:/Users/Rayan/Desktop/React%20JS/affliate-work-site/client/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/Rayan/Desktop/React%20JS/affliate-work-site/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1e3,
    // Increase the warning threshold for chunk sizes
    rollupOptions: {
      output: {
        manualChunks: {
          // Example: Splitting third-party libraries into separate chunks
          "react-query": ["@tanstack/react-query"],
          vendor: ["react", "react-dom"]
          // Vendor libraries
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxSYXlhblxcXFxEZXNrdG9wXFxcXFJlYWN0IEpTXFxcXGFmZmxpYXRlLXdvcmstc2l0ZVxcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFJheWFuXFxcXERlc2t0b3BcXFxcUmVhY3QgSlNcXFxcYWZmbGlhdGUtd29yay1zaXRlXFxcXGNsaWVudFxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvUmF5YW4vRGVza3RvcC9SZWFjdCUyMEpTL2FmZmxpYXRlLXdvcmstc2l0ZS9jbGllbnQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gIGJ1aWxkOiB7XHJcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsIC8vIEluY3JlYXNlIHRoZSB3YXJuaW5nIHRocmVzaG9sZCBmb3IgY2h1bmsgc2l6ZXNcclxuICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgbWFudWFsQ2h1bmtzOiB7XHJcbiAgICAgICAgICAvLyBFeGFtcGxlOiBTcGxpdHRpbmcgdGhpcmQtcGFydHkgbGlicmFyaWVzIGludG8gc2VwYXJhdGUgY2h1bmtzXHJcbiAgICAgICAgICAncmVhY3QtcXVlcnknOiBbJ0B0YW5zdGFjay9yZWFjdC1xdWVyeSddLFxyXG4gICAgICAgICAgdmVuZG9yOiBbJ3JlYWN0JywgJ3JlYWN0LWRvbSddLCAvLyBWZW5kb3IgbGlicmFyaWVzXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlcsU0FBUyxvQkFBb0I7QUFDMVksT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixPQUFPO0FBQUEsSUFDTCx1QkFBdUI7QUFBQTtBQUFBLElBQ3ZCLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQSxRQUNOLGNBQWM7QUFBQTtBQUFBLFVBRVosZUFBZSxDQUFDLHVCQUF1QjtBQUFBLFVBQ3ZDLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFBQTtBQUFBLFFBQy9CO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
