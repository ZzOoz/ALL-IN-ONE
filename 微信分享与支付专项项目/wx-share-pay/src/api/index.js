const hostname = 'http://teng.com/#/'
export default {
    wechatRedirect: `/api/wechat/redirect?url=${encodeURIComponent(hostname)}&scope=snsapi_userinfo`,
    wechatConfig: '/api/wechat/jssdk',
    getUserInfo: '/api/wechat/getUserInfo',
    payWallet: '/api/wechat/pay/payWallet'
}