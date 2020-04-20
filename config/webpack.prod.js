// const webpack = require("webpack");
const merge = require('webpack-merge');
const base = require('./webpack.base');
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = merge.smart(base, {
    mode: "production",
    devtool: 'source-map',
    // plugins: [],
    // 优化项，一般用户生产
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                cache: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
        // 抽离公共代码,单入口不需要
        splitChunks: { // 分割代码块
            cacheGroups: { // 缓存组
                common: { // 公共模块
                    chunks: 'initial',
                    minSize: 200,
                    minChunks: 2,
                },
                vendors: {
                    test: /node_modules/,
                    priority: 1, // 提高权重，跟放到上面位置结果一样
                    chunks: 'initial',
                    minSize: 200,
                    minChunks: 2,
                }
            }
        }
    },
});
