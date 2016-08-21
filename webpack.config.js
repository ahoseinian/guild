'use strict';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
let extractCSS = new ExtractTextPlugin('../css/[name].css');

module.exports = {
  entry: './src/front/js/App.js',
  output: {
    path: './public/js',
    filename: 'app.bundle.js',
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
    }, {
      test: /\.scss$/,
      loader: extractCSS.extract(['css','sass'])
    }]
  },
  plugins: [
    extractCSS,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ]
};
