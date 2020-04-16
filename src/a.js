class B {

}

function* gen() {
    yield 11;
}
// regeneratorRuntime is not defined,未进行标准话转换报错
console.log(gen().next());

export default "哈哈哈";
