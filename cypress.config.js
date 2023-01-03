const { defineConfig } = require('cypress');

module.exports = defineConfig({
  projectId: "dzuvmt",
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: false,
  },
});
