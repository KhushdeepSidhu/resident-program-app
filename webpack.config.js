const path = require('path');

module.exports = {
  entry: ['core-js/stable', './src/index.tsx'],
  output: {
    path: path.resolve(__dirname, 'public/scripts'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  devServer: {
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'public'),
    },
    devMiddleware: {
      publicPath: '/scripts/',
    },
    open: true, // To open browser automatically after running code
    // hot: 'only',
  },
  devtool: 'source-map',
};
