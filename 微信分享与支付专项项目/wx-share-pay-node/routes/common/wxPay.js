// 统一封装的微信支付模块（小程序、h5）
let config = require('../pay/config')
let request = require('request')
const utils = require('../../utils')
const createHash = require('create-hash')
const xml2Js = require('xml2js')
module.exports = {
    order: function (openid, attach, body, total_fee, notify_url, ip) {
        return new Promise((resolve, reject) => {
            let nonce_str = utils.createNonceStr()
            let out_trade_no = utils.createTradeNo('mp')
            // 支付前需要先获取支付签名 sign 用户 凭借xml格式数据使用
            let sign = this.getPrepaidSign(appid, openid, attach, body, total_fee, notify_url, ip, nonce_str, out_trade_no)
            let sendData = this.wxSendData(appid, openid, attach, body, total_fee, notify_url, ip, nonce_str, out_trade_no, sign)
            let url = 'https://api.mch.weixin.qq.com/pay/unifiedorder'
            let self = this
            request({
                url,
                method: 'POST',
                body: sendData
            }, function (err, response, body) {
                if (!err && response.statusCode === 200) {
                    // 使用xml2js将微信返回回来的数据转成对象
                    xml2Js.parseString(body.toString('utf-8'), (error, res) => {
                        // 如果不报错返回的是xml数据
                        if (!error) {
                            let data = res.xml;
                            // 当两者都是success的时候
                            if (data.return_code[0] == 'SUCCESS' && data.result_code[0] === 'SUCCESS') {
                                let prepay_id = data.prepay_id || []
                                // 将结果返回给小程序端进行调用
                                let payResult = self.getPayParams(appid, prepay_id[0])
                                resolve(payResult)
                            }
                        }
                    })
                } else {
                    resolve(utils.handleFail(err))
                }
            })
        })
    },
    // 生成预支付签名信息
    getPrepaidSign(appid, openid, attach, body, total_fee, notify_url, ip, nonce_str, out_trade_no) {
        let params = {
            appid,
            attach,       // 附加描述信息
            openid,      // openid
            body,       // 描述body
            mch_id: config.mch_id, // 商户id
            notify_url,
            nonce_str,      // 随机字符串
            out_trade_no, // 交易订单号
            spbill_create_ip: ip, // 服务器ip
            total_fee,  // 支付费用
            trade_type: 'JSAPI'
        }
        // 生成key-value格式的字符串并且加密
        let paySign = utils.getSign(params, config.key)
        return paySign
    },


    // 签名成功后，根据参数拼接组装xml格式的数据，调用下单接口
    wxSendData(openid, attach, body, total_fee, notify_url, ip, nonce_str, out_trade_no) {
        let data = '<xml>' +
            '<appid><![CDATA[' + appid + ']]></appid>' +
            '<attach><![CDATA[' + attach + ']]></attach>' +
            '<body><![CDATA[' + body + ']]></body>' +
            '<mch_id><![CDATA[' + config.mch_id + ']]></mch_id>' +
            '<nonce_str><![CDATA[' + nonce_str + ']]></nonce_str>' +
            '<openid><![CDATA[' + openid + ']]></openid>' +
            '<out_trade_no><![CDATA[' + out_trade_no + ']]></out_trade_no>' +
            '<spbill_create_ip><![CDATA[' + ip + ']]></spbill_create_ip>' +
            '<total_fee><![CDATA[' + total_fee + ']]></total_fee>' +
            '<trade_type><![CDATA[JSAPI]]></trade_type>' +
            '<sign><![CDATA[' + total_fee + ']]></sign>'

        return data
    },

    // 生成paySign 前端调用wx.requestPayment时需要使用
    getPayParams(appId, prepay_id) {
        let params = {
            appId,
            timeStamp,
            nonceStr,
            package: 'prepay_id' + prepay_id, // prepay_id格式包
            signType: 'MD5' // 签名格式
        }

        let paySign = utils.getSign(params, config.key)
        params.paySign = paySign
        return params
    }

}

