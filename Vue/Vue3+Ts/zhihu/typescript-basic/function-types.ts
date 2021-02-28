// ts中的函数
// 可选参数必须要在参数的最后面
// 函数声明方式
function add(x: number, y: number, z?: number): number {
    if (typeof z === 'number') {
        return x + y + z
    } else {
        return x + y
    }
}

// 函数表达式方式
const add2 = (x: number, y: number, z?: number): number {
    if (typeof z === 'number') {
        return x + y + z
    } else {
        return x + y
    }
}

// 对add3的类型进行约束 add3冒号后面（知道等号位置）都是对函数的描述
// 与实际的函数并无关系（同时这里也可以使用函数接口的方式）
const add3: (x: number, y: number, z?: number) => number = add

// 函数接口的方式定义函数
interface addSum {
    // 注意这里返回的number不是用箭头 而是用：
    (x: number, y: number, z?: number): number
}

const add4: addSum
