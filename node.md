# https://webpack.js.org/configuration/

webpack 功能解析模块，查找相关依赖。自己实现了模块化机制。默认 index.js => main.js,npm webpack => dist 文件夹

# 安装依赖

npm init -y

# 打包工具安装

npm install webpack webpack-cli -D

# 打包

npx webpack

# scripts 脚本配置之后 -- 前面不需要要写这个

npm run build -- --config webpack.config.js

# Html-webpack 使用使用本地模版 html 生成在 dist 下的 html 文件, dev-server 使用 express,在内存中打包，解析到内存中

npm install webpack-dev-server --save-dev
npm install --save-dev html-webpack-plugin

# css-loader 主要是解析@import 语法，css 应用 css

# style-loader 把 css 插入 head 标签中，后续可以移出来,默认插入到 head 中

npm install --save-dev css-loader style-loader

# sass-loader 安装

npm install node-sass sass-loader --save-dev

# 抽离出来的 css 使用 css 标签引用

npm install --save-dev mini-css-extract-plugin

# 使用浏览器前缀,兼容浏览器 需要相应设置浏览器的版本 ,移动端配置参考 install postcss-pxtorem --save-dev

"browserslist": [
"iOS >= 6",
"Android >= 4",
"IE >= 9"
]
npm install postcss-loader autoprefixer --save-dev
// 新 css 语法特性，可以替换前面的
npm install postcss-cssnext --save-dev

# 使用 clean-webpack-plugin，清除 dist,之后从新生成 bundle 包。

npm install --save-dev clean-webpack-plugin

# optimize-css-assets-webpack-plugin 压缩 css 代码

npm install --save-dev optimize-css-assets-webpack-plugin

# terser-webpack-plugin 压缩 js 代码

npm install --save-dev terser-webpack-plugin

# babel 用法

a.核心库 @babel/core
b.Polyfill 实现目标环境中缺少的功能 (通过 @babel/polyfill)，转换语法
c.babel-loader 解析模块
d.@babel/preset-env 预设：标准语法=>低级语法
c.babel-plugin-transform-runtime 减少冗余，增加语法转化之间的辅助函数
d.babel-runtime c 导入了 babel-runtime 必须要用
e.babel-preset-react 支持 JSX 语法，react 预设
f.@babel/plugin-proposal-class-properties 插件 ES7 相关的语法
g.@babel/plugin-proposal-decorators 装饰器

g.@babel/preset-typescript ts 预设

# 核心模块

npm install --save-dev babel-loader @babel/core @babel/preset-env // react 使用预设 babel-preset-react

# es7 class 转化插件 class A { a = 1; }

npm install --save-dev @babel/plugin-proposal-class-properties

# es7 装饰器语法转化插件 class A { a = 1; }

npm install --save-dev @babel/plugin-proposal-decorators

# babel-plugin-transform-runtime 实际上是依赖 babel-runtime, 当一些内置 api 不会去转化。 promise 和 regenerator 函数时，没有帮助代码。导致不识别

bable polyfill 3 中
babel-runtime bable-polyfill bable-plugin-transform-runtime,
第一种比较大，单独项目直接配置 babel-plugin-transform-runtime
npm install --save-dev @babel/plugin-transform-runtime
npm install @babel/runtime
缺点 "".includes()不支持

# 代码规范

npm install eslint eslint-loader --save-dev

# 全局变量的使用 jquery, 和引入其他第三放模块,全局拿到方法

1.npm install jquery
2.npm install expose-loader --save-dev => 拿到 window.$
    a.// import $ from 'expose-loader?$!jquery';
    b.import $ from 'jquery';
webpack.config.js rules
{
test: require.resolve('jquery'),
use: 'expose-loader?$'
    },
  3.ProviderPlugins 使用
  console.log($);
4.cdn 引入

# 图片使用

1.file-loader => 在内部生成一张图片到 dist 目录下，常永远图片比较大，自定义图片对象 2.在 css 应用
2.html-withimg-loader 在标签内部直接写路径
3.url-loader 图片限制 200\*1024, 设置了 limit 之后就不需要 file-loaders
npm install file-loader html-withimg-loader url-loader --save-dev

# copy-webpack-plugin 一些文件直接打包，比如一些 3 方 JS

npm install copy-webpack-plugin --save-dev

# 区分环境变量以及 webpack-mrege 使用

npm i webpack-merge
// sh 脚本插件工具
npm install scripty --save-dev
// 找到 sh 脚本位置
chmod -R +x scripts
// 拿到 node 环境转化成 object
npm install yargs-parser --save-dev

// 减少打印参数
npm install friendly-errors-webpack-plugin --save-dev
// webpack-build-notifier 这个选择用

# noParse 使用， 如果第三方包独立的，可以减少解析时间

noParse: /jquery/, // 不去解析依赖包和依赖包，如果库很大的时候有点用 echart.js 等

# IgnorePlugin 插件使用，忽略 moment 的多语言包，需要手动导入语言包。

Webpack.IgnorePlugin

# 动态链接库,任务清单。需要到任务清单找，没有在实现打包

npm i react react-dom
npm install --save-dev @babel/preset-react

# webpack 自带优化

tree-shaking: import ES6 在生产模式下，把没有用到的代码,自动去掉。

scopy hosting: 作用域提升，在 webpack 自动把这个对象放到当前作用域中。

# 懒加载(比如播放才去加载某个 JS 文件) import('./a.js') 草案语法需要babel插件
npm install --save-dev @babel/plugin-syntax-dynamic-import
