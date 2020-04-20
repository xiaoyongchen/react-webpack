const { resolve } = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserJSPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // installed via npm

const argv = require("yargs-parser")(process.argv.slice(2));
const _mode = argv.mode || "development";
const isDev = _mode === "development";

module.exports = {
    entry: {
        index: resolve("./src/index.js"),
        // other: './src/other'    //  多入口
    },
    output: {
        filename: "js/[name].[hash:8].js", // 打包后文件名，默认main.js,hash每次生成的build不一样。
        path: resolve("dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve("./src/index.html"), // 需要使用的模版
            filename: "index.html",
            chunks: ["index"], // 可以设置多个chunks
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
            ignoreOrder: false,
            minify: {
                minifyCSS: true,
                minifyJS: true,
            },
        }),
        new CleanWebpackPlugin(), // 默认dist
        // new webpack.ProvidePlugin({
        //     jquery: '$'
        // }),
        new CopyWebpackPlugin([
            {
                from: resolve(__dirname, "static"),
                to: "./static",
            },
        ]),
        new webpack.BannerPlugin("make 2019 by 陈小勇"),
    ],

    // 模块,特点单一
    module: {
        rules: [
            // {
            //     enforce: 'pre',
            //     test: /\.(js|jsx)$/,
            //     exclude: /(node_modules|bower_components)/,
            //     include: [resolve(__dirname, "src")],
            //     use:"eslint-loader",
            // },
            // {
            //     test: require.resolve('jquery'),
            //     use: 'expose-loader?$'
            // },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                include: [resolve(__dirname, "src")],
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.(css|scss|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            publicPath: "../",
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
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "html-withimg-loader",
                },
            },
            {
                test: /\.(png|jpg|gif|eot|woff2|woff|ttf)$/i,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 2,
                            outputPath: "img/",
                            esModule: false, //  'html-withimg-loader' 不起作用解决
                        },
                    },
                ],
            },
        ],
    },
    // cdn引入不用再次打包
    externals: {
        jquery: "$",
    },
    // dev 优化实时更新
    watch: true,
    watchOptions: {
        poll: 1000, // 轮训
        aggregateTimeout: 500, // 防抖
        ignored: /node_modules/,
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
    // 解析第三方包，和设置一些别名
    resolve: {
        modules: [resolve("node-modules")],
        // mainFields: ['style', 'main'], // 查找文件的优先级，或者范围
        // alias: {
        //     bootstrap: 'bootstrap/dist/css/bootstrap.css'
        // }
        extensions: [".ts", ".tsx", ".js", ".jsx", ".scss", ".css"], // 可以省略的后缀名，以及优先级
    },
};
