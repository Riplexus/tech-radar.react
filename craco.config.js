const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@Atoms': path.resolve(__dirname, 'src/components/Atoms'),
      '@Molecules': path.resolve(__dirname, 'src/components/Molecules'),
      '@Organisms': path.resolve(__dirname, 'src/components/Organisms'),
      '@Pages': path.resolve(__dirname, 'src/components/Pages')
    }
  }
};