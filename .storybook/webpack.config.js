const path = require('path');

module.exports = {
  devtool: 'inline-sourcemap',
  entry: ['babel-polyfill'],
  module: {
    loaders: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style/useable', 'css', 'sass'] },
      { test: /\.css$/, loader: 'style/useable!css' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(woff(2)|woff|otf|png)(\?[a-z0-9=&.]+)?$/, loader: 'url-loader' },
      { test: /\.(ttf|eot|svg|jpg)(\?[a-z0-9=&.]+)?$/, loader: 'file-loader' },
      { test: /\.png$/, loader: 'url-loader?limit=100000' },
    ],
  },
};
