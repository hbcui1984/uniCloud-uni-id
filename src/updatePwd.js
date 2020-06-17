import encryptPwd from './encryptPwd.js'
import uniToken from './uniToken.js'
import userCollection from './init.js'

async function updatePwd(user, context) {

    const userInDB = await userCollection.doc(user.uid).get()

    console.log('userInDB:', userInDB);

    if (userInDB && userInDB.data && userInDB.data.length > 0) {

        let pwdInDB = userInDB.data[0].password

        if (encryptPwd(user.oldPassword) == pwdInDB) { //旧密码匹配


            try {
                let upRes = await userCollection.doc(userInDB.data[0]._id).update({
                    password: encryptPwd(user.newPassword)
                });

                console.log('upRes', upRes);

                return {
                    code: 0,
                    msg: '修改成功'
                }
            } catch (e) {
                console.log('发生异常', e);
                return {
                    code: 1104,
                    msg: '数据库写入异常'
                }
            }


        } else {
            return {
                code: 1102,
                msg: '密码错误'
            }
        }
    } else {

        return {
            code: 1101,
            msg: '用户不存在'
        }

    }
    return {
        code: 0,
        msg: 'success'
    }

}

export default updatePwd
