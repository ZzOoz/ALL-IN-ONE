// 公共函数的编写
import wx from 'weixin-js-sdk'
export default {
    // 获取url后面的查询字符串
    getUrlParams(name) {
        // 获取以name开头或者前面时&后面是name的字符 然后匹配等号后面除了&的多个字符
        let reg = new RegExp('(^|&)' + name + '=([^&]*)')
        // 将search获取到的第一个字符截取掉 也就是问号？ 然后匹配正则
        let r = window.location.search.substr(1).match(reg)
        // 返回结果
        if (r !== null) return decodeURIComponent(r[2])
    },
    initSharInfo() {
        let shareInfo = {
            title: '', // 分享标题
            desc: '', // 分享描述
            link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
        }

        // 朋友圈和微信好友分享
        wx.onMenuShareTimeline(shareInfo)
        wx.onMenuShareAppMessage(shareInfo)
        wx.onMenuShareQQ(shareInfo)  // 分享qq
        wx.onMenuShareQZone(shareInfo) // 分享qq空间

        // wx.updateAppMessageShareData(shareInfo)  // 新版分享
        // wx.updateTimelineShareData(shareInfo)
    }
}