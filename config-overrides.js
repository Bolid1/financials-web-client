const {overrideDevServer, addBabelPlugin, addDecoratorsLegacy, override} = require('customize-cra')

module.exports = {
  webpack: override(
    addBabelPlugin('react-hot-loader/babel'),
    addDecoratorsLegacy(),
    addBabelPlugin('@babel/plugin-proposal-optional-chaining'),
    addBabelPlugin(
      [
        'babel-plugin-react-intl-auto',
        {
          removePrefix: 'src/',
          filebase: true,
          extractComments: true,
        },
      ],
    ),
    addBabelPlugin(['react-intl', {enforceDescriptions: false}]),
    addBabelPlugin(['react-intl-extractor', {
      'langFiles': [{
        'path': './src/translations/ru.json',
        'cleanUpNewMessages': false,
      }, {
        'path': './src/translations/en.json',
        'cleanUpNewMessages': true,
      }, {
        'path': './src/translations/it.json',
        'cleanUpNewMessages': true,
      }],
    }]),
  ),
  devServer: overrideDevServer(
    config => {
      Object.assign(
        config.watchOptions,
        {
          aggregateTimeout: 300,
          poll: 500,
        },
      )

      return config
    },
  ),
}
