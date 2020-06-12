import encryptPwd from './encryptPwd.js'
import uniToken from './uniToken.js'


const userCollect = uniCloud.database().collection('users')

async function updatePwd(user, context) {


    let payload = uniToken.checkToken(user.token)
    console.log('updatePwd::payload:', payload);
    
    if(payload.code && payload.code > 0){
        return payload
    }

    if(payload.uid !== user.uid){
        return {
            code: 1105,
            msg: 'token不合法，请重新登录'
        }
    }

    const userInDB = await userCollect.doc(user.uid).get()

    console.log('userInDB:', userInDB);

    if (userInDB && userInDB.data && userInDB.data.length > 0) {

        let pwdInDB = userInDB.data[0].password

        if (encryptPwd(user.oldPassword) == pwdInDB) { //旧密码匹配


            try {
                await userCollect.doc(userInDB.data[0]._id).update({
                    password: encryptPwd(user.newPassword)
                });

                console.log('upRes', upRes);

                return {
                    code: 0,
                    msg: '修改成功'
                }
            } catch (e) {
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
