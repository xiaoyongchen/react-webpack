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
