let express = require('express')
let config = require('./config')
let cache = require('memory-cache')
let request = require('request')
let router = express.Router()
let utils = require('../../utils')
let common = require('../common')
let createHash = require('create-hash')
let dao = require('../common/db')
config = config.wx

router.get('/test', function (req, res) {
    res.json({
        code: 0,
        data: 'test',
        message: 'success'
    })
})

router.get('/redirect', function (req, res) {
    // 重定向地址从前端获取,但是这个地址是需要先获取到openId才去重定向的 还没获取到openId的时候需要去跳转另一个url获取openId
    let redirectUrl = req.query.url
    // 先缓存redirectUrl 后面使用
    cache.put('redirectUrl', redirectUrl)
    // 实际上应该跳转下面这个callback地址（自己调用自己）先获取到openId在跳转上面这个redirectUrl地址
    let callback = 'http://teng.com/api/wechat/getOpenId'
    // 从前端获取scope
    let scope = req.query.scope
    let authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.appID}&redirect_uri=${encodeURIComponent(callback)}&response_type=code&scope=${scope}&state=STATE#wechat_redirec`
    // 跳转地址获取opendID
    // console.log('跳转咯~~~~')
    res.redirect(authUrl)
})

router.get('/getOpenId', async function (req, res) {
    // 获取回调回来的code码
    let code = req.query.code
    if (!code) {
        res.json(utils.handleFail('没有获取到code码~~'))
    } else {
        let result = await common.getAccessToken(code)
        // 成功
        if (result.code == 0) {
            let data = result.data
            // console.log(result, 'result')
            console.log(data, 'data')
            let expire_time = 1000 * 60 * 1 // 一小时过期
            cache.put('access_token', data.access_token, expire_time)
            cache.put('openid', data.openid, expire_time)
            // 存入cookie中
            res.cookie('openId', data.openid, { maxAge: expire_time })
            // 从mongodb中查询openid是否存在词用户
            let userRes = await dao.query({ "openid": data.openid }, 'users')
            if (userRes.code == 0) {
                // 如果已经有用户数据那么就直接跳转url
                if (userRes.data.length > 0) {
                    // 从memory-cache中获取redirectUrl 进行重定向跳转
                    let redirectUrl = cache.get('redirectUrl')
                    res.redirect(redirectUrl)
                } else {
                    // 有的话就查询用户信息
                    let userData = await common.getUserInfo(data.access_token, data.openid)
                    // 插入信息
                    let insertData = await dao.insert(userData.data, 'users')
                    if (insertData.code == 0) {
                        let redirectUrl = cache.get('redirectUrl')
                        res.redirect(redirectUrl)
                    } else {
                        res.json(insertData)
                    }
                }
            } else {
                res.json(userRes)
            }


        } else {
            // 发生错误
            res.json(result)
        }
        // request.get(openIdUrl, function (err, response, body) {
        //     // 没有发生错误的话且返回的状态码是200
        //     if (!err && response.statusCode == '200') {
        //         // 将获取到的body解析成对象
        //         let data = JSON.parse(body)
        //         console.log(body, 'body')
        //         let expire_time = 1000 * 60 * 1 // 一小时过期
        //         // 存入cookie中
        //         res.cookie('openId', data.openid, { maxAge: expire_time })
        //         // 从memory-cache中获取redirectUrl 进行重定向跳转
        //         let redirectUrl = cache.get('redirectUrl')
        //         res.redirect(redirectUrl)
        //     } else {

        //     }
        // })
    }
})

// 获取用户授权信息
router.get('/getUserInfo', async function (req, res) {
    let openid = cache.get('openid')
    let access_token = cache.get('access_token')
    let result = await common.getUserInfo(access_token, openid)
    res.json(result)
})

// 获取jssdk配置 前端调用
router.get('/jssdk', async function (req, res) {
    console.log('jssdk')
    let url = req.query.url
    // 获取token
    let result = await common.getSigntureToken()
    if (result.code == 0) {
        let token = result.data.access_token
        cache.put('token', token)
        let result2 = await common.getSigntureTicket(token)
        if (result2.code == 0) {
            let ticket = result2.data.ticket
            let params = {
                noncestr: utils.createNonceStr(),
                jsapi_ticket: ticket,
                timestamp: utils.createTimeStamp(),
                url
            }
            // 生成字符串用于生成sign签名
            let str = utils.raw(params)
            // 使用微信官方规定的sha1机密str字符串生成sign
            let sign = createHash('sha1').update(str).digest('hex')
            // 后面就是依次返回数据给前端
            res.json(utils.handleSuccess({
                appid: config.appID,
                timestamp: params.timestamp,
                noncestr: params.noncestr,
                signature: sign,
                jsApiList: [
                    // 'updateAppMessageShareData',
                    // 'updateTimelineShareData',
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage',
                    'onMenuShareQQ',
                    'chooseWxPay'
                ]
            }))
        }
    }
})


module.exports = router