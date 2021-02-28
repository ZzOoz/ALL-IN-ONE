// 类的接口 对类的内容进行约束,如果类中有共有的方法的话可以通过接口约束
// 假设Car和Phone都有一个switchRadio的方法，但是他们并不是子类和父类的关系
// 那么使用接口就很合适了

// 类接口
interface Radio {
    switchRadio(trigger: boolean): void
}

interface Battery {
    checkBattery(): void
}

// 类的继承
interface RadioWitchBattery extends Radio {
    checkBattery(): void
}

class Car implements Radio {
    // 定义了接口之后必须有switchRadio
    switchRadio(trigger: boolean) {

    }
}

// 同时使用多个类接口
class Phone implements Radio, Battery {
    switchRadio(trigger: boolean) {

    }
    checkBattery() {

    }
}

class Pc implements RadioWitchBattery {
    switchRadio(trigger: boolean) {

    }
    checkBattery() {

    }
}