const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'production', // production || development
    entry: './src/index.js', // 入口，相对路径
    output: {
        filename: 'bundle.[hash:8].js', // 打包后文件名，默认main.js,hash每次生成的build不一样。
        path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
        open: true,
        port: 3000,
        progress: true, // 进度条
        contentBase: './dist', // 不使用默认内存中的，制定文件夹
        compress: true, // gzip压缩
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // 需要使用的模版
            filename: 'index.html',
            // 在生产上生成dist/index.html一些压缩
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
            },
            hash: true, // <script 后面build.js?后面的哈希值
        }),
    ]

}
