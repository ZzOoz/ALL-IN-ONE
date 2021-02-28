// 泛型

// 1.将泛型作为一个占位符，通过实际来动态确定类型
function echo<T>(arg: T): T {
    return arg
}

const result1 = echo('123') // 具有string类型
const result2 = echo(123)   // 具有number类型
const result3 = echo(true)   // 具有boolean类型

// 2.也可以定义多个泛型类型

// 定义两个泛型T和U 参数是一个元组类型[T,U],返回值[U:T]
function swap<T, U>(tuple: [T, U]): [U, T] {
    return [tuple[1], tuple[0]]
}

const result4 = swap(['string', 123])
result4[1] // 具有字符串的方法
result4[0] // 具有number的方法

// 3.约束泛型

interface IwithLength {
    length: number // 将约束泛型通过extends被继承，只要有length这个属性就可以通过
}

function echoWithLength<T extends IwithLength>(arg: T): T {
    console.log(arg.length)
    return arg
}

const result5 = echoWithLength('123')   // string具有length属性
const result6 = echoWithLength([1, 2, 3]) // number具有length属性
const result7 = echoWithLength({ length: 10, name: '123' })  // obj这个对象具有length属性


// 4.类泛型

// 当我想要这个类型的push方法进入数组的数据和pop方法出去数组的数据是一样的类型的时候0
class Queue<T>{
    private data = []
    push(item: T) {
        return this.data.push(item)
    }
    pop(): T {
        return this.data.shift()
    }
}

const queue = new Queue<number>()
queue.push(1)
queue.push('string')  // 会报错因为传入的不是一个数字类型
console.log(queue.pop().toFixed())
console.log(queue.pop().toFixed())  //会报错因为传入的不是一个数字类型


// 接口泛型
interface keyPair<T, U> {
    key: T,
    value: U
}

const key1: keyPair<number, string> = { key: 11, value: 'string' }
const key2: keyPair<string, number> = { key: '111', value: 123 }