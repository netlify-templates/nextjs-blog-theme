const { defineConfig } = require('cypress');

// Use Netlify deploy preview URL if we have it
const baseUrl = process.env.DEPLOY_PRIME_URL || 'http://localhost:3000';

module.exports = defineConfig({
  e2e: {
    baseUrl,
    supportFile: false,
  },
});
