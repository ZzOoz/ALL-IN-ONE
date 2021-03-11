import lrz from 'lrz'
import axios from 'axios'
/**
 * 
 * @param {*} image 图片
 */
export async function zipImage(image){
    let result = null
    const data = await lrz(image, { quality: 0.8 })
      .then((rst) => {
        result = rst
        return Promise.resolve(result)
      })
      .catch((err) => {
        return Promise.reject(err)
      })
      .always(function() {
        return Promise.resolve(result)
      })
    return data.file
}

export async function getUploadToken(){

}

/**
 * 
 * @param {*} file 文件本体
 * @param {*} resourceName 资源名称
 * @param {*} type 上传类型
 * @param {*} qiniuTypeEnum 
 * @param {*} params 
 * @param {*} tokenParams 
 */

export async function uploadFile(file,resourceName,type,qiniuTypeEnum = 'QINIU_NOT_CALLBACK', params = {}, tokenParams = {}){
    if(!resourceName){
        return Promise.reject(new Error('请填写resouceName,格式: 服务名/实体名/实体ID/image|video'))
    }

    // 1.先获取七牛云的token
    const token = await getUploadToken(qiniuTypeEnum,tokenParams)
    const formData = new FormData()

    const resultFile = (type === 'image' && await zipImage( file.raw || file ) || (file.raw || file))
    
    // 2.拼接formData数据
    formData.append('token',token)
    formData.append('file',resultFile)

    Object.keys(params).forEach(cur => {
        formData(cur,params[cur])
    })

    formData.append('key', resourceName + '/' + type + '/' + '/' + Date.now() + '/' + file.name)

    return axios({
        url: 'http' + '://up-z2.qiniup.com',
        method: 'post',
        data: formData,
        headers: {
          'etm-terminal-platform': 'PC'
        }
    })
}