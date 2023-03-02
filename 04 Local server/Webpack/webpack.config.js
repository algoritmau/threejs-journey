const path = require('path')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin')

const enabledSourceMap = process.env.NODE_ENV !== 'production'

const filePath = {
  pug: './src/pug/',
  scripts: './src/scripts/',
  styles: './src/styles/',
}

// Processing sass files
const entriesSass = WebpackWatchedGlobEntries.getEntries(
  [path.resolve(__dirname, `${filePath.styles}**/**.sass`)],
  {
    ignore: path.resolve(__dirname, `${filePath.styles}**/_*.scss`),
  }
)()

console.log('********************** WAIT A MINUTE! ******************************')
console.log(entriesSass)
console.log('********************** WAIT A MINUTE! ******************************')

const cssGlobPlugins = (entriesSass) =>
  Object.keys(entriesSass).map(
    (key) =>
      new MiniCssExtractPlugin({
        // Output file name
        filename: `./css/${key}.css`,
      })
  )

// Processing pug files
const entries = WebpackWatchedGlobEntries.getEntries(
  [path.resolve(__dirname, `${filePath.pug}**/*.pug`)],
  {
    ignore: path.resolve(__dirname, `${filePath.pug}**/_*.pug`),
  }
)()
const htmlGlobPlugins = (entries) =>
  Object.keys(entries).map(
    (key) =>
      new HtmlWebpackPlugin({
        // Output filename
        filename: `${key}.html`,
        template: `${filePath.pug}${key}.pug`,
        // Disables automatic output and compression of CSS and JS
        inject: false,
        minify: false,
      })
  )

// Processing TypeScript files
const entriesTS = WebpackWatchedGlobEntries.getEntries([
  path.resolve(__dirname, `${filePath.scripts}*.ts`),
])()

const app = {
  entry: entriesTS,
  output: {
    filename: './scripts/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    // Source folder
    static: path.resolve(__dirname, 'src'),
    open: true,
    port: 8080,
    devMiddleware: {
      index: true,
      writeToDisk: true,
    },
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true,
            },
          },
        ],
      },
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.sass$/i,
        // Loads and compiles Sass files
        use: [
          // Extracts CSS files
          MiniCssExtractPlugin.loader,
          // Creates `style` nodes from JS strings
          {
            loader: 'style-loader',
          },
          // Transates CSS into CommonJS
          {
            loader: 'css-loader',
            options: {
              // Disables URL resolution
              url: false,
              // Enables sourceMap if not in production mode
              sourceMap: enabledSourceMap,
              // Specifies loaders
              importLoaders: 2,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: enabledSourceMap,
              postcssOptions: {
                // Automatically assigns vendor prefixes
                plugins: [require('autoprefixer')({ grid: true })],
              },
            },
          },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              // Enables sourceMap if not in production mode
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
    ],
  },
  // Resolves .ts files with import statements
  resolve: {
    extensions: ['.ts', '.js'],
  },
  target: 'web',
  plugins: [
    ...cssGlobPlugins(entriesSass),
    ...htmlGlobPlugins(entries),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/images/'),
          to: path.resolve(__dirname, 'dist/images'),
        },
      ],
    }),
  ],
  devtool: 'source-map',
  watchOptions: {
    ignored: /node_modules/,
  },
}

module.exports = app
