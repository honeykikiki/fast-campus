const CrocoAlias = require('craco-alias')

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
}
