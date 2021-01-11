const MongoClient = require('mongodb').MongoClient
const utils = require("./../../utils")
const url = "mongodb://127.0.0.1:27017/wechat-share-pay"

// 查询数据
exports.query = function (data, table) {
    return new Promise((resolve, reject) => {
        connect(function (dbase, db) {
            // 拿到table表，找到data数据，并将其转化为数组
            dbase.collection(table).find(data).toArray(function (err, res) {
                if (err) {
                    throw err
                } else {
                    db.close()
                    // 处理数组，将其转出去
                    resolve(utils.handleSuccess(res))
                }
            })
        })
    })
}

// 插入数据
exports.insert = function (data, table) {
    return new Promise((resolve, reject) => {
        connect(function (dbase, db) {
            // 拿到table表，找到data数据，并将其转化为数组
            dbase.collection(table).insertOne(data, function (err, res) {
                if (err) {
                    throw err
                } else {
                    db.close()
                    // 处理数组，将其转出去
                    resolve(utils.handleSuccess(res))
                }
            })
        })
    })
}

// 链接数据库的方法
function connect(callback) {
    // 链接url,接受一个回调
    MongoClient.connect(url, function (err, db) {
        if (err) throw err
        // dbase就是这个数据库的表  
        let dbase = db.db('wechat-share-pay')
        // 将dbase用于操作表的和db对象传出去 db用于操作数据库
        callback(dbase, db)
    })
}