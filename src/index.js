// require('./a.js');
// console.log('第一次配置');

// // 默认支持JS模块, 对于css不支持。需要适当的loader转化js
require("./index.css");
// require("./b.scss");
// // babel 使用
// const fun = () => {
//     console.log("箭头函数");
// };
// fun();

// // 装饰器
// @log
// class A {
//     a = 1;
// }

// const a = new A();
// console.log(a.a);

// function log(params) {
//     console.log(params, +"23");
// }

// 内连loader。normal pre, push
// import $ from 'jquery';
// console.log($ + '1s');

// 跨域问题
// let xhr = new XMLHttpRequest();
// xhr.open('GET', '/api/user', true);
// xhr.onload = () => {
//     console.log(xhr.response);
// };
// xhr.send();
import React, {
    Component
} from "react";
import ReactDOM from "react-dom";

class Index extends Component {

    render() {
        return <div > Button < /div>
    }
}

ReactDOM.render( < Index / > , document.getElementById("app"));
