const {addBabelPlugin, addDecoratorsLegacy, override} = require('customize-cra')

module.exports = override(
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
)
