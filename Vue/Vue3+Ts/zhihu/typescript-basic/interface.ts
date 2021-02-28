// 定义接口（接口：对对象的形状加以描述）
interface Person {
    readonly id: number, // 只读属性
    name: string,
    age?: number         // 可选属性
}

// 使用接口
let Yteng: Person = {
    id: 1,           // 必选
    name: 'Yteng', // 必选
    age: 20    // 可选
}

Yteng.id = 111   // 报错 只读属性只用在属性上面 const用于变量上面