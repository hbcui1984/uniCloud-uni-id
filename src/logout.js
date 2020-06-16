import userCollection from './init.js'

/** 退出操作，从数据库中删除token
 * @param {Object} uid
 * @param {Object} context
 */
async function logout(uid, context) {
    try {
        let upRes = await userCollection.doc(uid).update({
            token: ''
        });
        
        //TODO 是否需要校验uid的真实性？即upRes.updated =0 时如何返回？

        console.log('logout->upRes', upRes);

        return {
            code: 0,
            msg: '退出成功'
        }
    } catch (e) {
        return {
            code: 1104,
            msg: '数据库写入异常'
        }
    }
}

export default logout
