// ts中数组的声明
const arrayOfNumber: number[] = [1,2,33]

// 元组类型（一个数组中想要有多个不同的类型）
const user:[string,number] = ['string',123]
// 数组中插入的数据类型也要和元组类型里面的其中之一
user.push(true)     // 不可以
user.push('true') // 可以