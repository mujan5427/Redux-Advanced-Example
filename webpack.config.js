/*
 * Webpack is installed at globally in My Macbook Air
 */

var path = require('path');

module.exports = {
  entry: './js/dist/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './js/dist/')
  },
  devtool: 'source-map'
};
