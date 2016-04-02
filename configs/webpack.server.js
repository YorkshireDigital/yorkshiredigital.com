const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  target: 'node',
  cache: false,
  context: __dirname,
  debug: false,
  devtool: 'source-map',
  entry: ['../src/server'],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'server.js'
  },
  plugins: [
    new webpack.DefinePlugin({ __CLIENT__: false, __SERVER__: true, __PRODUCTION__: true, __DEV__: false }),
    new webpack.DefinePlugin({ 'process.env': { NODE_ENV: '"production"' } })
  ],
  module: {
    loaders: [
      { test: /\.json$/, loaders: ['json'] },
			{ test: /\.(ico|gif|png|jpg|jpeg|svg|webp)$/, loaders: ['file?context=static&name=/[path][name].[ext]'], exclude: /node_modules/ },
			{ test: /\.jsx?$/, loaders: ['babel?presets[]=es2015&presets[]=stage-0&presets[]=react'], exclude: /node_modules/ },
			// { test: /\.jsx?$/, loaders: ['eslint-loader'], exclude: /node_modules/ }
    ],
    postLoaders: [
    ],
    noParse: /\.min\.js/
  },
  externals: [nodeExternals({
    whitelist: ['webpack/hot/poll?1000']
  })],
  resolve: {
    modulesDirectories: [
      'src',
      'node_modules',
      'static'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  node: {
    __dirname: true,
    fs: 'empty'
  }
};
