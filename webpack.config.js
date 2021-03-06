const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  mode: 'development',
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)$/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.png$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]?[hash]',
          limit: 10000,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: '책 추천 게시판',
    }),
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      NAVER_API_SECRET: JSON.stringify(process.env.NAVER_API_SECRET),
    }),
  ],
  resolve: {
    modules: ['node_modules'],
    extensions: ['.ts', '.tsx', '.js'],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    overlay: true,
    stats: 'errors-only',
    proxy: {
      '/api/*': {
        target: 'http://codebebop.tk',
        changeOrigin: true,
      },
      '/v1/*': {
        target: 'https://openapi.naver.com',
        changeOrigin: true,
      },
    },
    historyApiFallback: true,
  },
  target: 'web',
};
