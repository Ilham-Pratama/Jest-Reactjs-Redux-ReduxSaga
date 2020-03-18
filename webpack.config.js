const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './app/index.tsx',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'prod')
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './app/index.html'
    }),
    new MiniCssExtractPlugin(),
    new Dotenv()
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', 'jsx'],
    modules: ['node_modules', path.resolve(__dirname, 'app')]
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|ttf)$/,
        use: ['file-loader']
      }
    ]
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})]
  }
};
