enum Direction {
    Up,  // 默认从0开始，如果Up的值为10，那么下面的值会从10开始加1，0==>10
    Down, // 1==>11
    Left,  // 2==>12
    Right, // 3==>13
}

console.log(Direction.Up)
console.log(Direction[0])

// 常量枚举
    // const enum Direction2 {
    //     Up,
    //     Down,
    //     Left,
    //     Right,
    // }