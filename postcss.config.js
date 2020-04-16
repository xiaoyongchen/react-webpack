/**在使用postcss-loader，css前缀的时候需要使用autoprefixer插件
 * postcss-cssnext 支持css4一些新语法特性,包含了autoprefixer功能
 *
 */
module.exports = {
    plugins: [require("postcss-cssnext")],
};
