import path from 'path'
import url from 'url'
import webpack from 'webpack'
import packageJson from './package.json' assert { type: 'json' }

const { ModuleFederationPlugin } = webpack.container

// Extract some properties from the package.json file to avoid duplication
const deps = packageJson.peerDependencies

const { name } = packageJson

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DEV_SERVER_PORT = 3000

export default {
  mode: 'development',
  devtool: false,
  target: 'web',
  optimization: {
    minimize: false,
  },
  entry: './src/index.ts',
  output: {
    clean: true,
    // path: path.resolve(__dirname, 'dist'),
    // filename: `${name}.js`,
    publicPath: `http://localhost:${DEV_SERVER_PORT}/`,
    library: {
      type: 'module',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'HelloCyWeb',
      filename: 'remoteEntry.js',
      exposes: {
        './HelloApp': './src/HelloApp',
        './HelloPanel': './src/components/HelloPanel',
      },
      shared: {
        react: { singleton: true, eager: true, requiredVersion: deps['react'] },
        'react-dom': {
          singleton: true,
          eager: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  experiments: {
    outputModule: true,
  },
  devServer: {
    hot: true,
    port: DEV_SERVER_PORT,
  },
}
