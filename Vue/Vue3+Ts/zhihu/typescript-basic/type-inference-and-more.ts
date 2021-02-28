// 类型推断、联合类型、类型断言

// types inference 类型推断（通过值类型推断变量类型）
let str = 'str'

// union types 联合类型（可以给到多个类型）
let numberOrString: Number | String
numberOrString = '123'  // 不报错
numberOrString = 123    // 不报错

// types asert 类型断言（简单来说就是我比ts更了解这个变量的类型）
// 使用as关键字（不能断言联合类型以外的类型）
function getLength(input: string | number): number {
    const str = input as string
    if (str.length) {
        return str.length
    } else {
        const number = input as number
        return number.toString().length
    }
}

// types guard 类型守护（使用typeof和instanceOf等条件判断去判断类型）
function getLength2(input: string | number): number {
    if (typeof input === 'string') {
        return input.length
    } else {
        return input.toString().length
    }
}