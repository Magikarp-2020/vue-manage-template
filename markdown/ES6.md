[TOC]

# 简介

- ECMAScript 6.0（以下简称 ES6）是 JavaScript 语言的下一代标准，已经在2015年6月正式发布了。


- 老版本浏览器支持度不高





# Babel 转码器 

Babel 是一个广泛使用的 **ES6 转码器**，可以将 ES6 代码转为 ES5 代码，从而在现有环境执行。

这意味着，你可以用 ES6 的方式编写程序，又不用担心现有环境是否支持。下面是一个例子。

```javascript
// 转码前
input.map(item => item + 1);

// 转码后
input.map(function (item) {
    return item + 1;
});
```

上面的原始代码用了箭头函数，Babel 将其转为普通函数，就能在不支持箭头函数的 JavaScript 环境执行了。




# 变量

### 1. let

let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的**代码块内有效**。

```javascript
{
  let a = 10;
  var b = 1;
}

a // ReferenceError: a is not defined.
b // 1
```

> **注意：let不存在变量提升** - >  **先声明后使用**



```javascript
function f1() {
  let n = 5;
  if (true) {
    let n = 10;
  }
  console.log(n); // 5
}
```

上面的函数有两个代码块，都声明了变量n，运行后输出5。

如果使用var定义变量n，最后输出的值就是10。

- **外层代码块不受内层代码块的影响**
- **外层作用域无法读取内层作用域的变量**




### 2. const

- **声明一个只读的常量。一旦声明，常量的值就不能改变。**

- **一旦声明变量，就必须立即初始化，不能留到以后赋值。**

- **只在声明所在的块级作用域内有效**

- **不存在变量提升** - >  **先声明后使用**

  ​





# 字符串

### 模板字符串

传统的JavaScript语言，输出模板通常是这样写的。

```javascript
$('#result').append(
  'There are <b>' + basket.count + '</b> ' +
  'items in your basket, ' +
  '<em>' + basket.onSale +
  '</em> are on sale!'
);
```

上面这种写法相当繁琐不方便，ES6引入了模板字符串解决这个问题。

```javascript
$('#result').append(`
  There are <b>${basket.count}</b> items
   in your basket, <em>${basket.onSale}</em>
  are on sale!
`);
```

- **用反引号（`）标识**



- **字符串中嵌入变量，需要将变量名写在`${}`之中**


- **大括号内部可以放入任意的 Js 表达式、运算、引用对象属性、调用函数**

```javascript
  var x = 1;
  var y = 2;

  ${x} + ${y} = ${x + y}
  // "1 + 2 = 3"

  ${x} + ${y * 2} = ${x + y * 2}
  // "1 + 4 = 5"

  var obj = {x: 1, y: 2};
  ${obj.x + obj.y}
  // 3

  function fn() {
    return "Hello World";
  }
  foo ${fn()} bar
  // foo Hello World bar
```






# 函数

### 箭头函数

ES6允许使用**“箭头”（=>）**定义函数。

-  **1个参数**， 代码块只有**1条语句**


```javascript
var f = v => v + 1;     // 一定是return

// 等同于
var f = function(v) {
  return v + 1;
};
```

- **无参数**或**多个参数**，就使用一个**圆括号**代表参数部分。代码块只有**1条语句**

```javascript
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
```


- 代码块有**多条语句****，就要使用**大括号**将它们括起来，并且使用return语句返回。

```javascript
var sum = (num1, num2) => { 
  num1++; 
  return num1 + num2; 
}
```



#### this指向

箭头函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。

```javascript
function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  
  // 箭头函数
  setInterval(() => this.s1++, 1000);   // 定义时的对象：Timer实例
  
  // 普通函数
  setInterval(function () {
    this.s2++;              // 使用时的对象: window
    // console.log(this.s2);   // NaN
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);   // s1: 3
setTimeout(() => console.log('s2: ', timer.s2), 3100);   // s2: 0
```





# 数组

### 1. forEach 

```javascript
array.forEach(callback,[ thisObject])
```

forEach除了接受一个必须的**回调函数**参数，还可以接受一个可选的**上下文参数**（改变回调函数里面的**this指向**）（第2个参数）。

```javascript
var sum = 0;

[1, 2, 3, 4].forEach(function (item, index, array) {
  console.log(array[index] == item); // true
  sum += item;
});

alert(sum); // 10
```

```javascript
[].forEach(function(value, index, array) {
    // ...
});

对比jQuery中的$.each方法：
$.each([], function(index, value, array) {    // 注意：第1个和第2个参数正好是相反的
    // ...
});
```




### 2. filter 

```
array.filter(callback,[ thisObject]);
```

“过滤”、“筛选之意。指数组filter后，返回**过滤后的新数组**。

`callback`函数需要返回布尔值`true`或`false`。（弱等于`== true/false`就可以了）

```javascript
var users = [
  {name: "张含韵", "email": "zhang@email.com"},
  {name: "江一燕",   "email": "jiang@email.com"},
  {name: "李小璐",  "email": "li@email.com"}
];

var emailsZhang = users
  .map(function (user) { return user.email; })   // 获得邮件
  .filter(function(email) {  return /^zhang/.test(email); });   // 筛选出zhang开头的邮件

console.log(emailsZhang.join(", ")); // zhang@email.com
```



### 3. some

```
array.some(callback,[ thisObject]);
```

意指“某些”，指是否“某些项”合乎条件。

```javascript
var scores = [5, 8, 3, 10];
var current = 7;

var bool = scores.some((score) => {
    console.log(score);   // 5, 8
    return score > current;
})

if (bool) {
  alert("朕准了！");   // 结果
}
```

结果弹出了“朕准了”文字。 **`some`要求至少有1个值让`callback`返回`true`就可以了**。显然，8 > 7，因此`bool`值为`true`.

我们自然可以使用forEach进行判断，不过相比some,  不足在于，**some只要有true即返回不再执行了**。



**跳出循环集合**

```javascript
$.each 跳出循环：
	return false 跳出循环,   return true 进入下一个循环

for 跳出循环：
	break; 直接退出for这个循环。这个循环将不再被执行！
	continue; 直接跳出本次for循环。下次继续执行。
```

```javascript
/**
 * forEach
 */
var scores = [5, 8, 3, 10];
var current = 7;

scores.forEach((score) => {
    console.log(score);   // 5, 8, 3, 10
    return false;         // 无法跳出循环
})


/**
 * for循环
 */
var scores = [5, 8, 3, 10];
var current = 7;

for (let i = 0; i < 4; i++) {
    console.log(scores[i]);   // 5
    break;    // 跳出循环
}

/**
 * $.each
 */
return false;  跳出循环
```



### 4. every

```
array.every(callback,[ thisObject]);
```
跟some的基友关系已经是公开的秘密了，同样是返回Boolean值，不过，**every需要每一个项都满足条件**

```javascript
var scores = [5, 8, 3, 10];
var current = 7;

function higherThanCurrent(score) {
  return score > current;
}

if (scores.every(higherThanCurrent)) {
  console.log("朕准了！");
} else {
  console.log("来人，拖出去斩了！");    // 结果  
}
```





# Module 模块

历史上，JavaScript 一直没有模块（module）体系，无法将一个大程序拆分成互相依赖的小文件，再用简单的方法拼装起来。

在 ES6 之前，社区制定了一些模块加载方案，最主要的有 CommonJS 和 AMD 两种。

ES6，新增了两个命令：`export`和`import`。

```javascript
import:  导入
export:  输出
```



### export

一个模块就是一个独立的文件。该文件内部的所有变量，外部无法获取。如果你希望外部能够读取模块内部的某个变量，就必须使用`export`关键字输出该变量。

```javascript
// profile.js
export var firstName = 'Michael';
export var lastName = 'Jackson';
export var year = 1958;
```



`export`的写法，除了像上面这样，还有下面这种。**推荐下面的写法**：

```javascript
// profile.js
var firstName = 'Michael';
var lastName = 'Jackson';
var year = 1958;

export {firstName, lastName, year};
```



`export`命令除了输出变量，还可以输出**函数或类（class）**。

```javascript
export function multiply(x, y) {
  return x * y;
};
```



> **注意下面的写法**

```javascript
// 报错
export 1;

// 报错
var m = 1;
export m;

// 正确
export var m = 1;

// 正确
var m = 1;
export {m};
```

```javascript
// 报错
function f() {}
export f;

// 正确
export function f() {};

// 正确
function f() {}
export {f};
```



### import

使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块。

```javascript
// main.js
import {firstName} from './profile';
import {lastName} from './profile';

// 等同于
import {firstName, lastName} from './profile';    // 这里虽然加载了2次，但是只会执行1次

function setName(element) {
  element.textContent = firstName + ' ' + lastName;
}
```



`import`语句会执行所加载的模块，因此可以有下面的写法。

```javascript
import 'bootstrap';    // 仅执行bootstrap模块，但是不输入任何变量
```



#### 别名 ： as

```javascript
import {firstName as userFirstName, lastName} from './profile';  
```

serFirstName为firstName的别名



#### 模块的整体加载

上面写法是逐一指定要加载的方法，整体加载的写法如下。

```javascript
import * as user from './profile';

console.log('firstName：' + user.firstName);
console.log('lastName：' + user.lastName);
```





### export default

从前面的例子可以看出，使用`import`命令的时候，用户需要知道所要加载的变量名或函数名，否则无法加载。

为了给用户提供方便, 就要用到`export default`命令，为模块指定**默认输出**。

#### 函数

```java
// export-default.js
export default function () {     // 匿名函数
  console.log('foo');
}
```

其他模块加载该模块时，`import`命令可以为该匿名函数指定**任意名字**。

```javascript
// import-default.js
import customName from './export-default';    // customName 为任意名字
customName(); // 'foo'
```

> **注意： 这时import命令后面，不使用大括号。**



#### 变量

```javascript
// 正确
export var a = 1;

// 正确
var a = 1;
export default a;

// 错误
export default var a = 1;
```



下面比较一下**默认输出**和**正常输出**。

```javascript
// 第一组
export default function crc32() { // 默认输出
  // ...
}
import crc32 from 'crc32'; // 输入


// 第二组
export function crc32() { // 输出
  // ...
};
import {crc32} from 'crc32'; // 输入
```

- 第一组是使用`export default`时，对应的`import`语句**不需要**使用大括号；

  第二组是使用`export `时，对应的`import`语句**需要**使用大括号。


- **一个模块只能有一个默认输出**，因此`export default`命令只能使用一次。






### CommonJs模块

```javascript
// index.js
var animal = require('./content.js');  // require

// content.js
moudule.exports = 'A cat';      // moudule.exports
```