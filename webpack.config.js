import { fileURLToPath, URL } from 'url';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

export default {
  entry: './src/index.tsx',
  output: {
    filename: 'main.js',
    path: `${__dirname}/dist`,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
  devServer: {
    static: {
      directory: `${__dirname}/dist`,
    },
    compress: true,
    port: 3000,
    historyApiFallback: true,
    open: true,
  },
};
