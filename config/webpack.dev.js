const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
    mode: "development",
    devtool: 'cheap-source-map',
    watch: true,
    watchOptions: {
        poll: 1000, // 轮训
        aggregateTimeout: 500, // 防抖
        ignored: /node_modules/,
    },
    devServer: {
        port: 3000,
        progress: true, // 进度条
        contentBase: "./dist", // 不使用默认内存中的，制定文件夹
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
                messages: ['You application is running here http://localhost:3000'],
                notes: ['请使用npm run client:server运行开发环境🌶️']
            },
            onErrors: function (severity, errors) {
                // You can listen to errors transformed and prioritized by the plugin
                // severity can be 'error' or 'warning'
            },
            // should the console be cleared between each compilation?
            // default is true
            clearConsole: true
        })

    ],
};
