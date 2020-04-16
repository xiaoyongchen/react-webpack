const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js', // 入口，相对路径
    output: {
        filename: 'bundle.js', // 打包后文件名，默认main.js
        path: path.resolve(__dirname, 'dist'),
    }
}
