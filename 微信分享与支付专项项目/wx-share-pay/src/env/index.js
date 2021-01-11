// 环境变量的配置
const envList = {
    dev: {
        baseUrl: ''
    },
    test: {
        baseUrl: ''
    },
    prod: {
        domian: '',
        baseUrl: ''
    }
}

const currentEnv = 'prod'

const params = {
    'dev-teng.com': 'dev',
    'test-teng.com': 'test',
    'teng.com': 'prod'
}

currentEnv = params[location.hostname]

export default envList[currentEnv]