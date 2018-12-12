const path = require('path');
const webpack = require('webpack');
const NotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const stats = {
  all: false,
  assets: true,
  cachedAssets: true,
  children: false,
  chunks: false,
  entrypoints: true,
  errorDetails: true,
  errors: true,
  hash: true,
  modules: false,
  performance: true,
  publicPath: true,
  timings: true,
  warnings: false,
  exclude: [
    'node_modules'
  ]
};

module.exports = (env, argv) => {
  return {
    mode: argv.mode,
    entry: {
      app: './src/main.js',
    },
    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    resolve: {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        '@': path.join(__dirname, 'src'),
        vue: argv.mode === 'development' ? 'vue/dist/vue.esm.js' : 'vue/dist/vue.runtime.esm.js',
        jszip: argv.mode === 'development' ? 'jszip/dist/jszip' : 'jszip/dist/jszip.min'
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            shadow: true
          }
        },
        {
          test: /\.js$/,
          loader: [
            'babel-loader',
            'eslint-loader'
          ],
          include: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'test'),
            path.join(__dirname, 'node_modules/webpack-dev-server/client')
          ]
        },
        {
          test: /\.css/,
          loader: [
            argv.mode === 'development'
              ? 'vue-style-loader'
              : MiniCssExtractPlugin.loader,
              {loader: 'css-loader', options: {importLoaders: 1}},
              {loader: 'postcss-loader'},
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 100,
            name: 'img/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'media/[name].[hash:7].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'fonts/[name].[hash:7].[ext]'
          }
        }
      ]
    },
    plugins: [
      new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
      new webpack.NoEmitOnErrorsPlugin(),
      new OptimizeCSSAssetsPlugin({}),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: __dirname + '/src/index.ejs',
        inject: 'body'
      }),
      new MiniCssExtractPlugin({
        filename: 'style.css'
      }),
      new NotifierPlugin({
        alwaysNotify: true
      })
    ],
    devtool: process.env.WEBPACK_SERVE ? '#source-map' : '',
    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },
    node: {
      setImmediate: false,
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    },
    performance: {
      hints: false
    },
    stats: stats,
    devServer: {
      stats: stats,
      port: 4000
    }
  };
};
