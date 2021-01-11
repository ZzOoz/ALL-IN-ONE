// 微信接口统一封装处理
const request = require("request");
const config = require("../pay/config").wx;
const utils = require("../../utils");

// 获取网页授权token
exports.getAccessToken = function (code) {
  let openIdUrl = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${config.appID}&secret=${config.appsecret}&code=${code}&grant_type=authorization_code`;
  return new Promise((resolve, reject) => {
    request.get(openIdUrl, function (err, response, body) {
      let result = utils.handleResponse(err, response, body);
      // 成功
      if (result.code == 0) {
        console.log(result, "获取token");
        // console.log(result, 'openId,rsult')
        resolve(
          utils.handleSuccess({
            openid: result.data.openid,
            // 换取网页授权access_token
            access_token: result.data.access_token,
          })
        );
      } else {
        // 失败
        reject(result);
      }
    });
  });
};
// 获取用户信息
exports.getUserInfo = function (access_token, openid) {
  const userInfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`;
  return new Promise((resolve, reject) => {
    // console.log(userInfoUrl, "userInfoURLRLRLRL");
    request.get(userInfoUrl, function (err, response, body) {
      let result = utils.handleResponse(err, response, body);
      console.log(result, "用户信息");
      // 成功
      if (result.code == 0) {
        resolve(utils.handleSuccess(result.data));
      } else {
        // 失败
        reject(result);
      }
    });
  });
};

/**
 * @desc 获取微信js-sdk签名算法步骤
 * 1、生成对应的access_token
 * 2、获取对应的ticket
 * 3、生成签名算法（分别需要随机字符串noncestr、生成的ticket、时间戳timestamp、url）
 */
// 获取jssdk签名算法的token
exports.getSigntureToken = function () {
  const tokenUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${config.appID}&secret=${config.appsecret}`;
  return new Promise((resolve, reject) => {
    request.get(tokenUrl, function (err, response, body) {
      let result = utils.handleResponse(err, response, body);
      // 成功
      console.log(result, "获取到了js-sdk算法的signture");
      if (result.code == 0) {
        resolve(utils.handleSuccess(result.data));
      } else {
        // 失败
        reject(result);
      }
    });
  });
};

// 获取jssdk签名算法的ticket
exports.getSigntureTicket = function (access_token) {
  const ticketUrl = `https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`;
  return new Promise((resolve, reject) => {
    request.get(ticketUrl, function (err, response, body) {
      let result = utils.handleResponse(err, response, body);
      // 成功
      console.log(result, "获取到了js-sdk算法的ticket");
      if (result.code == 0) {
        resolve(utils.handleSuccess(result.data));
      } else {
        // 失败
        reject(result);
      }
    });
  });
};
