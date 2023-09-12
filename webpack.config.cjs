const path = require('path');

module.exports = {
  entry: './main.js', 
  output: {
    filename: 'bundle.js', 
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  resolve: {
    fallback: {
      "fs": false,
      "path": false,
      "os": false
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', 
        }
      },
    ],
  },
};
