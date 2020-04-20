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
    mode: "production", // production || development
    entry: {
        index: resolve("./src/index.js"),
        // other: './src/other'    //  多入口
    },
    output: {
        filename: "js/[name].[hash:8].js", // 打包后文件名，默认main.js,hash每次生成的build不一样。
        path: resolve("dist"),
    },
    devServer: {
        port: 3000,
        progress: true, // 进度条
        contentBase: resolve("dist"), // 不使用默认内存中的，制定文件夹
        compress: true, // gzip压缩
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
                from: resolve("static"),
                to: "static",
                ignore: [".*"],
            },
        ]),
        // new webpack.BannerPlugin("make 2019 by 陈小勇"),
        // new webpack.IgnorePlugin(/\.\/locale/, /moment/), //moment这个库中，如果引用了./locale/目录的内容，就忽略掉，不会打包进去
        // new webpack.NamedModulesPlugin(),
        // new webpack.HotModuleReplacementPlugin(), // 具体配置需要调用只用于调试 module.hot.accept
        // 设置任务清单。需要到任务清单找，没有在实现打包
        new webpack.DllReferencePlugin({
            manifest: resolve("static/dll", "manifest.json"),
        }),
    ],

    // 模块,特点单一
    module: {
        rules: [
            // {
            //     enforce: 'pre',
            //     test: /\.(js|jsx)$/,
            //     exclude: /(node_modules|bower_components)/,
            //     include: [resolve("src")],
            //     use:"eslint-loader",
            // },
            // {
            //     test: require.resolve('jquery'),
            //     use: 'expose-loader?$'
            // },
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                include: [resolve("src"), resolve("static")],
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
                use: {
                    loader: "html-withimg-loader",
                },
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192,
                            outputPath: "img/",
                            esModule: false, //  'html-withimg-loader' 不起作用解决
                        },
                    },
                ],
            },
            {
                test: /\.(woff|eot|ttf|svg|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 8192,
                    name: "font/[name].[hash:4].[ext]",
                },
            },
        ],
        noParse: /jquery/, // 不去解析依赖包和依赖包，如果库很大的时候有点用echart.js等
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
        // 抽离公共代码,单入口不需要
        splitChunks: {
            // 分割代码块
            cacheGroups: {
                // 缓存组
                common: {
                    // 公共模块
                    chunks: "initial",
                    minSize: 200,
                    minChunks: 2,
                },
                vendors: {
                    test: /node_modules/,
                    priority: 1, // 提高权重，跟放到上面位置结果一样
                    chunks: "initial",
                    minSize: 200,
                    minChunks: 2,
                },
            },
        },
    },
};
