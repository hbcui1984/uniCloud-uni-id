import userCollection from './init.js'

/** 退出操作，从数据库中删除token
 * @param {Object} uid
 * @param {Object} context
 */
async function logout(token) {
    try {

        const payload = await uniToken.checkToken(token)
        console.log('logout::payload:', payload);

        if (payload.code && payload.code > 0) {
            return payload
        }

        let upRes = await userCollection.doc(payload.uid).update({
            token: ''
        });

        console.log('logout->upRes', upRes);

        if (upRes.updated == 0) {
            return {
                code: 1101,
                msg: '用户不存在'
            }
        }

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
