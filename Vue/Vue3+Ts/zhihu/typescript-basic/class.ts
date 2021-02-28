// ts增强类
// public 修饰的属性和方法时共有的
// Private 修饰的属性和方法时私有的 只能在自己的类型访问
// Protected 修饰的属性和方法是受保护的 可以在子类和父类访问
class Animal {
    readonly name: string
    constructor(name) {
        this.name = name
    }
    protected run() {
        return `${this.name} is running`
    }
}

const snake = new Animal('Yteng')
snake.name = '123' // 只读属性
console.log(snake.run()) // 在protected和private的情况下会报错（不能访问）

class Dog extends Animal {
    constructor(name){
        super(name)
    }
    bark(){
        return `${this.name} is barking`
    }
    // protected保护过后可以在子类中使用
    run(){
        return 'name' + super.run()
    }
}

const xiaobao = new Dog('xiaobao')
console.log(xiaobao.run())