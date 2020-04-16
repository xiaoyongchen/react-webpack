/**在使用postcss-loader，css前缀的时候需要使用autoprefixer插件*/
module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}
