const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { InjectManifest } = require('workbox-webpack-plugin');
const path = require('path');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      hot: 'only',
      open: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'J.A.T.E.',
        template: './index.html',
        publicPath: '/',
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }), 
      new WebpackPwaManifest({
        filename: 'manifest.json',
        publicPath: '/',
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E.',
        description: 'Takes notes with JavaScript syntax highlighting!',
        start_url: '/',
        display: 'standalone',
        inject: true,
        fingerprints: false,
        orientation: 'portrait',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        crossorigin: 'use-credentials',
        icons: [
          {
            "src": "./src/images/logo.png",
            "sizes": [96, 128, 144, 152, 192, 256, 384, 512],
            "destination": "./assets/icons"
          } 
        ]
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
