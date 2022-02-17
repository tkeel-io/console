const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const config = require('config');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { merge } = require('webpack-merge');

const { staticDirectory } = require('./utils');
const baseConfig = require('./webpack.config.base');

const generateSourcemap = config?.builder?.generateSourcemap;

const prodConfig = {
  output: {
    filename: `${staticDirectory}js/[name].[contenthash].js`,
    chunkFilename: `${staticDirectory}js/[name].[contenthash].chunk.js`,
  },
  devtool: generateSourcemap ? 'source-map' : false,
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
    },
  },
  stats: 'normal',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: `${staticDirectory}css/[name].[contenthash].css`,
      chunkFilename: `${staticDirectory}css/[name].[contenthash].chunk.css`,
    }),
    process.env.ANALYZE && new BundleAnalyzerPlugin(),
  ].filter(Boolean),
};

module.exports = merge(baseConfig, prodConfig);
