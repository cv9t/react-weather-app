const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (argv) => {
  const isProd = argv.env === 'production';
  const mode = isProd ? 'production' : 'development';

  const webpackPlugins = (plugins = []) => {
    const defaultPlugins = [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
      }),
    ];

    if (plugins.length !== 0) {
      defaultPlugins.concat(plugins);
    }

    return defaultPlugins;
  };

  return {
    mode,
    entry: path.resolve(__dirname, './src/index.tsx'),
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    devServer: {
      port: 3000,
      historyApiFallback: true,
      hot: true,
      open: true,
    },
    devtool: isProd ? 'source-map' : false,
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.json$/,
          loader: 'json-loader',
        },
      ],
    },
    plugins: webpackPlugins(isProd ? [new ReactRefreshWebpackPlugin()] : []),
  };
};
