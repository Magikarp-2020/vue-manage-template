# 数组

## 1、forEach

```javascript
var sum = 0;

[1, 2, 3, 4].forEach(function (item, index, array) {
  console.log(array[index] == item); // true
  sum += item;
});

alert(sum); // 10
```



## 2、map
实际使用的时候，我们可以利用map方法方便获得对象数组中的特定属性值们。

```javascript
var users = [
  {name: "张含韵", "email": "zhang@email.com"},
  {name: "江一燕",   "email": "jiang@email.com"},
  {name: "李小璐",  "email": "li@email.com"}
];

var emails = users.map(function (user) { return user.email; });  
// 返回结果： 特定字段构成的数组

console.log(emails.join(", ")); // zhang@email.com, jiang@email.com, li@email.com
```



## 3、filter 

“过滤”、“筛选之意。指数组filter后，返回过滤后的新数组

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



# 4、some

意指“某些”，指是否“某些项”合乎条件。

```javascript
var scores = [5, 8, 3, 10];
var current = 7;

function higherThanCurrent(score) {
  return score > current;
}

if (scores.some(higherThanCurrent)) {
  alert("朕准了！");   // 结果
}
```

结果弹出了“朕准了”文字。 `some`要求至少有1个值让`callback`返回`true`就可以了。显然，8 > 7，因此`scores.some(higherThanCurrent)`值为`true`.

我们自然可以使用forEach进行判断，不过相比some,  不足在于，**some只要有true即返回不再执行了**==。



# 5、every

跟some的基友关系已经是公开的秘密了，同样是返回Boolean值，不过，every需要每一个妃子都要让朕满意，否则——“来人，给我拖出去砍了！”

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



# 6、indexOf

indexOf方法在字符串中自古就有，string.indexOf(searchString, position)。数组这里的indexOf方法与之类似。

```javascript
array.indexOf(searchElement[, fromIndex])
```

返回整数索引值，如果没有匹配（严格匹配），返回`-1`. `fromIndex`可选，表示从这个位置开始搜索，若缺省或格式不合要求，使用默认值`0`，我在FireFox下测试，发现使用字符串数值也是可以的，例如`"3"`和`3`都可以。

```javascript
var data = [2, 5, 7, 3, 5];

console.log(data.indexOf(5, "x")); // 1 ("x"被忽略)
console.log(data.indexOf(5, "3")); // 4 (从3号位开始搜索)

console.log(data.indexOf(4)); // -1 (未找到)
console.log(data.indexOf("5")); // -1 (未找到，因为5 !== "5")
```











