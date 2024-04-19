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
  devServer: {
    open: false, // 개발 서버가 시작될 때 브라우저를 열지 않도록 설정
  },
  babel: {
    presets: [
      [
        '@babel/preset-react',
        { runtime: 'automatic', importSource: '@emotion/react' },
      ],
    ],
    plugins: ['@emotion/babel-plugin'],
  },
}
