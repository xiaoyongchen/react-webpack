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

# 抽离出来的 css 使用 css 标签引用

npm install --save-dev mini-css-extract-plugin

# 使用浏览器前缀,兼容浏览器 需要相应设置浏览器的版本

"browserslist": [
"iOS >= 6",
"Android >= 4",
"IE >= 9"
]
npm install postcss-loader autoprefixer --save-dev

# 使用 clean-webpack-plugin，清除 dist,之后从新生成 bundle 包。

npm install --save-dev clean-webpack-plugin

# optimize-css-assets-webpack-plugin 压缩 css 代码

npm install --save-dev optimize-css-assets-webpack-plugin
