const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')

module.exports = (argv) => {
  const isProd = argv.env === 'production'
  const mode = isProd ? 'production' : 'development'
  const env = dotenv.config().parsed

  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next])
    return prev
  }, {})

  const webpackPlugins = (plugins = []) => {
    const defaultPlugins = [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './public/index.html'),
      }),
      new webpack.DefinePlugin(envKeys),
    ]

    if (plugins.length !== 0) {
      defaultPlugins.concat(plugins)
    }

    return defaultPlugins
  }

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
      ],
    },
    plugins: webpackPlugins(isProd ? [new ReactRefreshWebpackPlugin()] : []),
  }
}
