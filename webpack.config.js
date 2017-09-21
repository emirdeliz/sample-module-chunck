/* eslint no-console: 0 */
const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const alias = require('./webpack.alias.js');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

console.log('Initializing webpack...');
console.log(`Is debug: ${debug}`);

const envModule = {
  NODE_ENV: process.env.NODE_ENV,
};

const plugins = [
  new BundleAnalyzerPlugin(),
  new HtmlWebpackPlugin({
    template: 'assets/root/index.html',
    inject: 'body',
    filename: 'index.html',
  }),
  new webpack.EnvironmentPlugin(envModule),
  new webpack.optimize.CommonsChunkPlugin({
		name: 'react',
	}),
  new webpack.optimize.CommonsChunkPlugin({
		name: 'react-dom',
	}),
  new webpack.optimize.CommonsChunkPlugin({
		name: 'highcharts',
	}),
  new webpack.optimize.CommonsChunkPlugin({
		name: 'leaflet',
	}),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'react-leaflet',
  }),
];

const entry = {
  app: ['./index.jsx', 'babel-polyfill'],
  vendor: ['react', 'react-dom', 'highcharts', 'leaflet', 'react-leaflet'],
};

if (debug) {
  entry.app.push('webpack-hot-middleware/client?reload=true');
}

const PUBLIC_PATH = '/';
module.exports = {
  context: __dirname,
  devtool: debug ? 'eval' : 'source-map',
  entry,
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules\/(?!sample-submodule-chunck)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: [
            'react-html-attrs',
            'transform-class-properties',
            'transform-decorators-legacy',
          ],
        },
      },
      { test: /\.yaml$/, include: path.resolve('data'), loader: 'yaml' },
      { test: /\.scss$/, loaders: ['style-loader/useable', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, loader: ['style-loader/useable', 'css-loader'] },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(woff(2)|woff|otf|png)(\?[a-z0-9=&.]+)?$/, loader: 'url-loader' },
      {
        test: /\.(ttf|eot|svg|jpg)(\?[a-z0-9=&.]+)?$/,
        loader: 'file-loader',
        options: { name: '[name].[ext]' },
      },
    ],
  },
  output: {
    pathinfo: true,
    path: path.resolve(__dirname, '__build__'),
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: PUBLIC_PATH,
  },
  resolve: { alias, unsafeCache: true },
  plugins: debug ? [
    ...plugins,
    new webpack.HotModuleReplacementPlugin(),
  ] : [
    ...plugins,
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: {
        warnings: false, // Suppress uglification warnings
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        screw_ie8: true,
      },
      output: {
        comments: false,
      },
      exclude: [/\.min\.js$/gi], // skip pre-minified libs
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'tago-new-admin',
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      minify: true,
      staticFileGlobsIgnorePatterns: [/__build__\/.*\.html/],
    }),
  ],
};
