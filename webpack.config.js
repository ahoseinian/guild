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
      test: /\.(scss|css)$/,
      loader: extractCSS.extract(['css', 'sass'])
    }, {
      test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
      // loader: "url?limit=10000"
      loader: 'url'
    }, {
      test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
      loader: 'file'
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
