import uniToken from './uniToken.js'
import userCollection from './init.js'

/** 设置头像
 * @param {Object} params
 * @param {Object} context
 */
async function setAvatar(params, context) {

    try {
        let upRes = await userCollection.doc(params.uid).update({
            avatar: params.avatar
        });

        console.log('setAvatar -> upRes', upRes);

        return {
            code: 0,
            msg: '设置成功'
        }
    } catch (e) {
        console.log('发生异常', e);
        return {
            code: 1104,
            msg: '数据库写入异常'
        }
    }
}

export default setAvatar
