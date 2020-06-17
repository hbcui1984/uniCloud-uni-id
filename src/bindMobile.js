import encryptPwd from './encryptPwd.js'
import uniToken from './uniToken.js'
import userCollection from './init.js'


async function bindMobile(params, context) {

    try {
        let upRes = await userCollection.doc(params.uid).update({
            mobile: params.mobile,
            mobileConfirmed: 1
        });

        console.log('bindMobile -> upRes', upRes);

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

export default bindMobile
