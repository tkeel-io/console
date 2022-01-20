const path = require('path');

const webpack = require('webpack');
const config = require('config');
const dotenvFlow = require('dotenv-flow');
const dotenvExpand = require('dotenv-expand');
const DotenvWebpack = require('dotenv-webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ConfigWebpackPlugin = require('config-webpack');

const publicPath = config.get('publicPath');
const documentTitle = config.get('documentTitle');
const generateSourcemap = config.get('builder.generateSourcemap');

const {
  env,
  isEnvDevelopment,
  isEnvProduction,
} = require('../scripts/utils/env');
const paths = require('../scripts/utils/paths');

dotenvExpand.expand(dotenvFlow.config());

const getStyleLoaders = () => {
  let [sourceMap, modules] = [true, { auto: true }];

  if (isEnvDevelopment) {
    modules = {
      ...modules,
      localIdentName: '[path][name]__[local]',
    };
  }
  if (isEnvProduction) {
    sourceMap = !!generateSourcemap;
  }

  return [
    isEnvDevelopment && 'style-loader',
    isEnvProduction && {
      loader: MiniCssExtractPlugin.loader,
    },
    {
      loader: 'css-loader',
      options: {
        sourceMap,
        modules,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        sourceMap,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap,
      },
    },
  ].filter(Boolean);
};

const contenthash = '[contenthash]';

module.exports = {
  mode: env,
  entry: path.resolve(paths.cwd.src, 'index'),
  output: {
    path: paths.cwd.dist,
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        include: [
          paths.cwd.src,
          ...(() => {
            const { self, ...rest } = paths.packages;
            return Object.keys(rest).map((key) => rest[key]);
          })(),
        ],
        exclude: paths.root.nodeModules,
        loader: 'babel-loader',
        options: {
          rootMode: 'upward',
        },
      },
      {
        test: /\.(handlebars|hbs)$/,
        loader: 'handlebars-loader',
      },
      {
        test: /\.(sass|scss|css)$/,
        use: getStyleLoaders(),
      },

      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset',
        generator: {
          filename: `assets/images/[name].${
            isEnvProduction ? contenthash : ''
          }[ext][query]`,
        },
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            issuer: /\.(js|jsx|ts|tsx)$/i,
            resourceQuery: /svgr/,
            use: [
              {
                loader: '@svgr/webpack',
                options: {
                  prettier: false,
                  svgo: false,
                  svgoConfig: {
                    plugins: [{ removeViewBox: false }],
                  },
                  titleProp: true,
                  ref: true,
                  replaceAttrValues: {
                    '#324558': '',
                    '#B6C2CD': 'currentColor',
                  },
                },
              },
            ],
          },
          {
            type: 'asset',
            generator: {
              filename: `assets/images/[name].${
                isEnvProduction ? contenthash : ''
              }[ext][query]`,
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        include: /\/fonts\//,
        generator: {
          filename: `assets/fonts/[name].${
            isEnvProduction ? contenthash : ''
          }[ext][query]`,
        },
      },
    ],
  },
  resolve: {
    modules: [paths.root.nodeModules, paths.cwd.src],
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
  target: 'web',
  plugins: [
    /* cspell: disable-next-line */
    new DotenvWebpack({ systemvars: true }),
    new HtmlWebpackPlugin({
      title: documentTitle,
      template: path.resolve(paths.cwd.public, 'index.handlebars'),
      inject: true,
      favicon: path.resolve(paths.cwd.public, 'favicon.svg'),
      hash: true,
    }),
    new ForkTsCheckerWebpackPlugin(),
    new ConfigWebpackPlugin('GLOBAL_CONFIG'),
    new ESLintPlugin({
      context: 'src',
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      fix: true,
      emitWarning: false,
    }),
    new StylelintPlugin({
      context: 'src',
      extensions: ['css', 'scss', 'js', 'jsx', 'ts', 'tsx'],
      fix: true,
    }),
    new webpack.ProgressPlugin(),
  ],
};
