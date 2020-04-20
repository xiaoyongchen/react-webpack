// const webpack = require("webpack");
const merge = require('webpack-merge');
const base = require('./webpack.base');

module.exports = merge.smart(base, {
    mode: "production",
    devtool: 'source-map',
    plugins: [
        // new webpack.DefinePlugin({
        //     Dev: JSON.stringify('production')
        // }),
    ],
    // 优化项，一般用户生产
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                cache: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
        splitChunks: {
            chunks: 'all',
        },
    }
});
