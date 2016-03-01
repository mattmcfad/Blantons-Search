'use strict';

const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const basePlugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    __PRODUCTION__: process.env.NODE_ENV === 'production',
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
  }),
  new webpack.optimize.CommonsChunkPlugin('vendor', '[name].[hash].js'),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    inject: 'body'
  })
];

const devPlugins = [
  new webpack.NoErrorsPlugin(),
];

const prodPlugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  })
];

const plugins = basePlugins
  .concat(process.env.NODE_ENV === 'production' ? prodPlugins : [])
  .concat(process.env.NODE_ENV === 'development' ? devPlugins : []);

module.exports = {

  entry: {
    app: './src/index.ts',
    vendor: [
      'es5-shim',
      'es6-shim',
      'es6-promise',
      'angular',
      'redux',
      'redux-thunk',
      'ng-redux',
      'redux-logger'
    ]
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath: "/",
    sourceMapFilename: '[name].[hash].js.map',
    chunkFilename: '[id].chunk.js'
  },

  devtool: 'source-map',

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },

  plugins: plugins,

  module: {
    preLoaders: [{
      test: /\.ts$/,
      loader: 'tslint'
    }],
    loaders: [
      { test: /\.ts$/, loader: 'ts', exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: 'style-loader!css-loader?sourceMap' },
      { test: /\.svg/, loader: 'url' },
      { test: /\.eot/, loader: 'url' },
      { test: /\.woff/, loader: 'url' },
      { test: /\.woff2/, loader: 'url' },
      { test: /\.ttf/, loader: 'url' },
    ]
  }
}
