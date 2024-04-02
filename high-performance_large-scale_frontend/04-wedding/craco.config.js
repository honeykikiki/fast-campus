const CrocoAlias = require('craco-alias')
const fontPreloadPlugin = require('webpack-font-preload-plugin')

module.exports = {
  plugins: [
    {
      plugin: CrocoAlias,
      options: {
        source: 'tsconfig',
        tsConfigPath: 'tsconfig.paths.json',
      },
    },
  ],
  webpack: {
    plugins: {
      add: [
        new fontPreloadPlugin({
          extensions: ['woff2'],
        }),
      ],
    },
  },
}
