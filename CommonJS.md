### 概述
每个文件就是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。 
CommonJS规范规定，每个模块内部，module变量代表当前模块。这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。
#### module.exports
module.exports属性表示当前模块对外输出的接口，其他文件加载该模块，实际上就是读取module.exports变量
#### exports变量
为了方便，Node为每个模块提供一个exports变量，指向module.exports。这等同在每个模块头部，有一行这样的命令。
```js
var exports = module.exports;
```
在对外输出模块接口时，可以向exports对象添加方法。
```js
exports.area = function (r) {
  return Math.PI * r * r;
};
```
注意，不能直接将exports变量指向一个值，因为这样等于切断了exports与module.exports的联系。
```js
exports = function(x) {console.log(x)};
```
### require
#### 用法
require命令的基本功能是，读入并执行一个JavaScript文件，然后返回该模块的exports对象。如果没有发现指定模块，会报错
```js
//example2.js
module.exports = function () {
  console.log("hello world")
}
//example1.js
require('./example2.js')()
```