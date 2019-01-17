
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new UglifyJsPlugin({ sourceMap: true }),
    new Dotenv(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: 'Index',
      template: './src/index.html',
      inject: 'body',
    })
  ],
  module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.(gif|png|jp(e*)g|svg)$/,
      use: [{
          loader: 'url-loader',
          options: {
              limit: 8000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]'
          }
      }]
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "eslint-loader"
    },
    // new rule
    {
      test: /\.js$/,
      exclude: [
        /node_modules/,
        /spec/
      ],
      loader: "babel-loader",
      options: {
        presets: ['es2015']
      }
    }
  ]
}
};
