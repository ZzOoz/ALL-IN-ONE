// 微信小程序相关功能路由
const express = require('express')
const request = require('request')
const utils = require('../../utils')
const dao = require('../common/db')
const wxPay = require('../common/wxPay')
let config = require('./config')
config = config.mp
let router = express.Router()

// 根据前端传来的code 获取openId
router.get('/getSession', function (req, res) {
    let code = req.query.code
    if (!code) {
        res.json(utils.handleFail('code不能为空', 10001))
    } else {
        console.log(config, 'config')
        let sessionUrl = `https://api.weixin.qq.com/sns/jscode2session?appid=${config.appID}&secret=${config.appsecret}&js_code=${code}&grant_type=authorization_code`
        console.log(code, 'code')
        console.log(sessionUrl, 'sessionUrl')
        request(sessionUrl, function (err, response, body) {
            let result = utils.handleResponse(err, response, body)
            console.log(result, 'result')
            res.json(result)
        })
    }
})

// 小程序登录
router.get('/login', async function (req, res) {
    let userInfo = JSON.parse(req.query.userInfo)
    if (!userInfo) {
        res.json(utils.handleFail('用户信息不能为空', 10002))
    } else {
        // 查询用户是否已经注册过了 通过在users的小程序表中查
        let userRes = await dao.query({ openid: userInfo.openid }, 'users_mp')
        if (userRes.code === 0) {
            if (userRes.data.length > 0) {
                res.json(utils.handleSuccess({
                    userId: userRes.data[0]._id
                }))
            } else {
                let insertData = await dao.insert(userInfo, 'users_mp')
                if (insertData.code === 0) {
                    let result = await dao.query({ openid: userInfo.openid }, 'users_mp')
                    res.json(utils.handleSuccess({
                        userId: result.data[0]._id
                    }))
                } else {
                    res.json(insertData)
                }
            }
        } else {
            res.json(userRes)
        }
    }
})

router.get('/pay/callback', function (req, res) {

})


// 小程序支付路由
router.get('/pay/payWallet', function (req, res) {
    let openId = req.query.openid  // 用户openId
    let appId = config.mp.appID
    let attach = '支付项目(附加描述数据)'
    let body = '微信小程序支付主题描述内容'
    let total_fee = req.query.money // 支付金额（以分为单位）
    let notify_url = 'http://localhost:3000/api/mp/pay/callback'  // 支付回调地址
    let ip = '192.168.1.1' // 定义服务器的ip 因为本人没有商户号和服务器 所以随便写一个
    // 调用统一支付方法
    wxPay.order(appId,openId, attach, body, total_fee, notify_url,ip).then(res => {
        res.json(utils.handleSuccess(res))
    }).catch(err => {
        res.json(utils.handleFail(err))
    })
})
module.exports = router