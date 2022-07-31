const CompressionPlugin = require(`compression-webpack-plugin`);
const path = require(`path`);

module.exports = {
  plugins: [
    new CompressionPlugin({
      test: /\.(js|css|html)$/,
      filename(info) {
        let opFile = info.filename.split('.'),
          opFileType = opFile.pop(),
          opFileName = opFile.join('.');

        return `${opFileName}.${opFileType}.gzip`;
      }
    })
  ]
};
