module.exports = {
  env: {
    test: {
      plugins: [
        [
          'istanbul',
          {
            exclude: ['spec/**/*.js'],
          },
        ],
      ],
    },
  },
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
}
