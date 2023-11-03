const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js', // Adjust your entry point as needed
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Adjust your output filename as needed
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
    },
  }, 
  module: {
    rules: [
      // Add any necessary loaders for your project
      {
        test: /\.js$/,
        use: 'babel-loader', // Example loader for JavaScript files
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // Add any necessary plugins for your project
    new webpack.ProvidePlugin({
      process: 'process/browser', // Provide a process polyfill
    }),
  ],
};

// Additional webpack configuration options can be added here

