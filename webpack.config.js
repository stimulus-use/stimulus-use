// this webpack configuration is only used for the playground test site with yarn start
const path = require('path')

module.exports = {
  entry: {
    bundle: './playground/index.js',
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public'),
  },

  resolve: {
    alias: {
      'stimulus-use': path.resolve(__dirname, './dist/index.modern.js'),
    },
  },

  devServer: {
    contentBase: './playground',
  },

  devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
    ],
  },
}
