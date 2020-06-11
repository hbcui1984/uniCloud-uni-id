import encryptPwd from './encryptPwd.js'
import uniToken from './uniToken.js'

const db = uniCloud.database();
const userCollect = db.collection('users')

async function login(user, context) {
    const userInDB = await userCollect.where({
        username: user.username
    }).limit(1).get()


    console.log('userInDB:', userInDB);


    if (userInDB && userInDB.data && userInDB.data.length > 0) {

        let pwdInDB = userInDB.data[0].password

        if (encryptPwd(user.password) == pwdInDB) {
            try {
                console.log('开始修改最后登录时间');

                let upRes = await userCollect.doc(userInDB.data[0]._id).update({
                    last_login_ip: context.CLIENTIP
                });

                console.log('upRes', upRes);
                
                let token = uniToken.createToken(userInDB.data[0])
                console.log('token',token);

                return {
                    code: 0,
                    token:token,
                    msg: '登录成功'
                }
            } catch (e) {
                console.log('写入异常：',e);
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

export default login
