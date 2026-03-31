const nextConfig = require('eslint-config-next');

// The issue was wrapping nextConfig in another array.
// It needs to be spread into the main config array.
module.exports = [
  ...nextConfig, 
  {
    // Ignore server-side directories and files from React-specific rules
    ignores: ['src/ai/**', 'src/app/actions.ts']
  }
];
