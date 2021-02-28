// 类型别名、字面量、交叉类型

// 1.类型别名
let sum: (x: number, y: number) => number
let sumResult1 = sum

// 拥有类型别名无需每次都声明类型
type PlusType = (x: number, y: number) => number
let sum2: PlusType
let sumResult2 = sum2

type StrOrNumber = string | number
let sumResult3: StrOrNumber = '123'
sumResult3 = 123

// 2.字面量
let str1: 'name' = 'name'  // 当确定了str1的类型时'name'的时候就必须是name值
let str2: 123 = 123        // 同理
type Directions = 'Left' | 'Right' | 'Up' | 'Down'
let dir: Directions = 'Left'  // 只能是'Left' | 'Right' | 'Up' | 'Down'这几个值

// 3.交叉类型
interface IName {
    name: string
}

type IPerson = IName & { age: number }   // 通过类型别名交叉age属性
let person: IPerson = { name: '123', age: 123 }




// 4.一些内置类型
interface Person1 {
    name: string,
    sex: number
}

// Partial是一个将全部属性都当作可选参数的属性的内置类型
type IPartial = Partial<Person1>
let Yteng1: IPartial = {}

// Omit是一个将特定属性忽略的内置对象
type IOmit = Omit<Person1, 'name'>
let Yteng2: IOmit = { sex: 123 }