const createHash = require('create-hash')
module.exports = {
    // 生成随机字符串
    createNonceStr() {
        // 生成36进制的随机数并且截取2到15位
        return Math.random().toString(36).substr(2, 15)
    },

    // 生成时间戳
    createTimeStamp(type = 'wx') {
        return parseInt(new Date().getTime() / 1000) + ''
    },
    
    // 创建系统交易 订单号
    createTradeNo(){
        let date = new Date().getTime().toString()
        let text = ''
        let possible = '0123456789'
        for(let i = 0;i < 5;i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length))
        }
        return (type === 'wx' ? 'TengH5':'TengMp') + date + text
    },

    getSign(params,key){
        let string = this.raw(params) + '&key=' + key  // config为商户的key值
        let sign = createHash('md5').update(string).digest('hex')
        return sign.toUpperCase()
    },

    // 对js-sdk的params进行排序
    raw(args) {
        const keys = Object.keys(args).sort()
        console.log(keys, 'keys')
        const obj = {}
        keys.forEach((key) => {
            obj[key] = args[key]
        })
        console.log(obj, 'obj')
        // 将对象obj拼接成a=1&b=2的url拼接字符串
        let val = ''
        for (const k in obj) {
            val += "&" + k + "=" + obj[k]
        }
        // 截取第一个字符
        // console.log(val.substr(1), '截取的第一个字符串')
        return val.substr(1)
    },

    // 处理响应结果
    handleResponse(err, response, body) {
        if (!err && response.statusCode == '200') {
            let data = JSON.parse(body)

            // 如果data不为空且微信返回的结果中没有errcode，就代表成功 有就代表有错误
            if (data && !data.errcode) {
                return this.handleSuccess(data)
            } else {
                return this.handleFail(data.message, data.errcode)
            }
        } else {
            // 微信自身发生异常
            return this.handleFail(err, 999999)
        }
    },
    // 成功返回数据的方法
    handleSuccess(data = '') {
        return {
            code: 0,
            data,
            message: '成功'
        }
    },

    // 失败返回数据的方法
    handleFail(message = '', code = 1001) {
        return {
            code,
            data: '',
            message
        }
    }
}