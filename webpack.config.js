const path = require('path');
const webpack = require('webpack');
const NotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env, argv) => {
  return {
    mode: process.env.WEBPACK_SERVE ? 'development' : argv.mode,
    entry: {
      app: './src/main.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    resolve: {
      extensions: ['.js', '.vue', '.json', '.css'],
      alias: {
        '@': path.join(__dirname, 'src'),
        vue: process.env.WEBPACK_SERVE ? 'vue/dist/vue.esm.js' : 'vue/dist/vue.runtime.esm.js',
        jszip: process.env.WEBPACK_SERVE ? 'jszip/dist/jszip' : 'jszip/dist/jszip.min'
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
          loader: 'babel-loader',
          include: [
            path.join(__dirname, 'src'),
            path.join(__dirname, 'test'),
            path.join(__dirname, 'node_modules/webpack-dev-server/client')
          ]
        },
        {
          test: /\.css/,
          loader: [
            process.env.WEBPACK_SERVE
              ? 'vue-style-loader'
              : MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            }
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
    serve: {
      compress: true,
      host: '0.0.0.0',
      port: 4000,
      hot: {
        logLevel: 'info',
        logTime: true
      }
    },
    optimization: {
      splitChunks: {
        // cacheGroups: {
        //   commons: {
        //     test: /[\\/]node_modules[\\/]/,
        //     name: 'vendors',
        //     chunks: 'all'
        //   }
        // },
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
    }
  };
};
