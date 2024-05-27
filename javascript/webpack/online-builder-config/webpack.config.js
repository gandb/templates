const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImagesConfigWebpackPlugin = require('image-config-webpack-plugin');
const JsConfigWebpackPlugin = require('js-config-webpack-plugin');
const ScssConfigWebpackPlugin = require('scss-config-webpack-plugin');
const TsConfigWebpackPlugin = require('ts-config-webpack-plugin');

module.exports = {
  plugins: [
    // Cleans the dist folder before the build starts
    new CleanWebpackPlugin(['dist']),
    // Generate a base html file and injects all generated css and js files
    new HtmlWebpackPlugin(),
    // File loader configuration for .gif .jpg .jpeg .png and .svg files
    // see https://github.com/namics/webpack-config-plugins/tree/master/packages/image-config-webpack-plugin/config
    new ImagesConfigWebpackPlugin(),
    // Multi threading babel loader configuration with caching for .js and .jsx files
    // see https://github.com/namics/webpack-config-plugins/tree/master/packages/js-config-webpack-plugin/config
    new JsConfigWebpackPlugin(),
    // SCSS Configuration for .css .module.css and .scss .module.scss files
    // see https://github.com/namics/webpack-config-plugins/tree/master/packages/scss-config-webpack-plugin/config
    new ScssConfigWebpackPlugin(),
    // Multi threading typescript loader configuration with caching for .ts and .tsx files
    // see https://github.com/namics/webpack-config-plugins/tree/master/packages/ts-config-webpack-plugin/config
    new TsConfigWebpackPlugin(),
  ],
};
