const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const {
    CleanWebpackPlugin
} = require("clean-webpack-plugin"); // installed via npm

const isDev = process.env.NODE_ENV === "development";
module.exports = {
    mode: "development", // production || development
    entry: {
        index: "./src/index.js", // 入口，相对路径
        // other: './src/other'    //  多入口
    },
    output: {
        filename: "js/[name].[hash:8].js", // 打包后文件名，默认main.js,hash每次生成的build不一样。
        path: path.resolve(__dirname, "dist"),
    },
    devServer: {
        port: 3000,
        progress: true, // 进度条
        contentBase: "./dist", // 不使用默认内存中的，制定文件夹
        compress: true, // gzip压缩
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html", // 需要使用的模版
            filename: "index.html",
            chunks: ['index'], // 可以设置多个chunks
            // 在生产上生成dist/index.html一些压缩
            // minify: {
            //     removeAttributeQuotes: true,
            //     collapseWhitespace: true,
            // },
            // hash: true, // <script 后面build.js?后面的哈希值
        }),
        // new HtmlWebpackPlugin({
        //     template: "./src/other.html", // 需要使用的模版
        //     filename: "index.html",
        //     chunks: ['ohter'], // 可以设置多个chunks
        //     // 在生产上生成dist/index.html一些压缩
        //     // minify: {
        //     //     removeAttributeQuotes: true,
        //     //     collapseWhitespace: true,
        //     // },
        //     // hash: true, // <script 后面build.js?后面的哈希值
        // }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "[id].css",
            ignoreOrder: false
        }),
        new CleanWebpackPlugin(),
        // new webpack.ProvidePlugin({
        //     jquery: '$'
        // }),


    ],

    // 模块,特点单一
    module: {
        rules: [

            // {   
            //     enforce: 'pre',
            //     test: /\.(js|jsx)$/,
            //     exclude: /(node_modules|bower_components)/,
            //     include: [path.resolve(__dirname, "src")],
            //     use:"eslint-loader",
            // },
            // {
            //     test: require.resolve('jquery'),
            //     use: 'expose-loader?$'
            // },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                include: [path.resolve(__dirname, "src")],
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [{
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            publicPath: '../'
                        },
                    },
                    {
                        loader: "css-loader",
                    },
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(htm|html)$/i,
                // exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'html-withimg-loader',
                },
            },
            {
                test: /\.(png|jpg|gif|eot|woff2|woff|ttf)$/i,
                // exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 200 * 1024,
                        outputPath: 'img/',
                        esModule: false, //  'html-withimg-loader' 不起作用解决
                    },
                }],
            }
        ],
    },
    // cdn引入不用再次打包
    externals: {
        jquery: '$'
    },
    // 优化项，一般用户生产
    optimization: {
        minimizer: [
            new TerserJSPlugin({
                cache: true,
            }),
            new OptimizeCSSAssetsPlugin({}),
        ],
    },

};
