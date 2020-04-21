const path = require("path");
// const webpack = require("webpack");
const merge = require("webpack-merge");
const base = require("./webpack.base");
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin");

module.exports = merge.smart(base, {
    mode: "development",
    devtool: "cheap-source-map",
    watch: true,
    watchOptions: {
        poll: 1000, // 轮训
        aggregateTimeout: 500, // 防抖
        ignored: /node_modules/,
    },
    devServer: {
        port: 3000,
        progress: true, // 进度条
        contentBase: path.resolve("dist"), // 不使用默认内存中的，制定文件夹
        compress: true, // gzip压缩
        quiet: true, // friendly-errors-webpack-plugin需要配置
        // proxy: {
        //     '/api': {
        //         target: 'http://localhost:3000/',
        //         pathRewrite: {
        //             '/api': ''
        //         }
        //     }
        // }
    },
    plugins: [
        // new webpack.DefinePlugin({
        //     Dev: JSON.stringify('development')
        // }),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [
                    "You application is running here http://localhost:3000",
                ],
                notes: ["请使用npm run client:server运行开发环境🌶️"],
            },
            onErrors: function (severity, errors) {
                // You can listen to errors transformed and prioritized by the plugin
                // severity can be 'error' or 'warning'
                console.log("errors" + errors);
            },
            // should the console be cleared between each compilation?
            // default is true
            clearConsole: true,
        }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false, //删除无用代码时不输出警告
        //         drop_console: true, //删除所有console语句，可以兼容IE
        //         collapse_vars: true, //内嵌已定义但只使用一次的变量
        //         reduce_vars: true, //提取使用多次但没定义的静态值到变量
        //     },
        //     output: {
        //         beautify: false, //最紧凑的输出，不保留空格和制表符
        //         comments: false, //删除所有注释
        //     }
        // }),
        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin(), // 具体配置需要调用只用于调试 module.hot.accept
    ],
});
