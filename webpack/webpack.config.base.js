const path = require('path');

const config = require('config');
const dotenvExpand = require('dotenv-expand');
const dotenvFlow = require('dotenv-flow');
const DotenvWebpack = require('dotenv-webpack');
// const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');

const {
  env,
  isEnvDevelopment,
  isEnvProduction,
} = require('../scripts/utils/env');
const paths = require('../scripts/utils/paths');
const { staticDirectory } = require('./utils');

const publicPath = config?.publicPath;
const generateSourcemap = config?.builder?.generateSourcemap;

dotenvExpand.expand(dotenvFlow.config());

const getStyleLoaders = ({ type } = {}) => {
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
    ['sass', 'scss'].includes(type) && {
      loader: 'sass-loader',
      options: {
        sourceMap,
      },
    },
    type === 'less' && {
      loader: 'less-loader',
      options: {
        sourceMap,
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: { '@enable-css-reset': false },
        },
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
        test: /\.css$/,
        use: getStyleLoaders(),
      },
      {
        test: /\.(sass|scss)$/,
        use: getStyleLoaders({ type: 'sass' }),
      },
      {
        test: /\.less$/,
        use: getStyleLoaders({ type: 'less' }),
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset',
        generator: {
          filename: `${staticDirectory}images/[name].${
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
            type: 'asset/inline',
            // generator: {
            //   dataUrl: `${staticDirectory}images/[name].${
            //     isEnvProduction ? contenthash : ''
            //   }[ext][query]`,
            // },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        include: /\/fonts\//,
        generator: {
          filename: `${staticDirectory}fonts/[name].${
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
    fallback: {
      util: false,
    },
  },
  target: 'web',
  plugins: [
    /* cspell: disable-next-line */
    new DotenvWebpack({ systemvars: true }),
    new HtmlWebpackPlugin({
      title: '',
      template: path.resolve(paths.cwd.public, 'index.handlebars'),
      inject: true,
      // favicon: path.resolve(paths.cwd.public, 'favicon.svg'),
      hash: true,
    }),
    new ForkTsCheckerWebpackPlugin(),
    /* new ESLintPlugin({
      context: 'src',
      extensions: ['js', 'jsx', 'ts', 'tsx'],
      fix: true,
      emitWarning: false,
    }), */
    new StylelintPlugin({
      context: 'src',
      extensions: ['css', 'scss', 'js', 'jsx', 'ts', 'tsx'],
      fix: true,
    }),
    new webpack.ProgressPlugin(),
    new MonacoWebpackPlugin({
      languages: ['json', 'yaml'],
    }),
  ],
};
