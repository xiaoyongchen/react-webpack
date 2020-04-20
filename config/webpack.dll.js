const webpack = require("webpack");
const path = require("path");
const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    entry: {
        vendor: [
            "react",
            "react-dom",
            // 'react-router',
            // 'axios',
            // 'lodash'
        ],
        // redux: [
        //   'redux',
        //   'redux-thunk',
        //   'react-redux',
        //   'react-router-redux',
        // ],
    },
    devtool: "source-mapcheap-module-eval-souce-map",
    output: {
        filename: "[name].dll.js",
        path: path.resolve(__dirname, "../static/dll"),
        library: "[name]_[hash]",
    },
    performance: false,
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname, "../static/dll"),
            ],
            verbose: true,
        }),
        // 使用插件 DllPlugin
        new webpack.DllPlugin({
            path: path.resolve(
                __dirname,
                "../static/dll",
                "manifest.json"
            ),
            // This must match the output.library option above
            name: "[name]_[hash]",
            context: __dirname,
        }),
    ],
};
