module.exports = {
    devServer: {
        host: 'teng.com',
        port: 80,
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                ws: false,
                changeOrigin: false
                // changeOrigin 为false的时候代理请求的时候不会将/api带过去
                // 比如请求带有/api/test 那么请求后端的时候完成的地址为http://localhsot:5000/api/test (changeOrigin为true的时候)
                // 反之为false的时候会是 http://localhost:5000/test
            }
        }
    }
}