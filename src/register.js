import encryptPwd from './encryptPwd.js'
import userCollection from './init.js'

async function register(user, context) {
    const userInDB = await userCollection.where({
        username: user.username
    }).count()


    console.log('userInDB:', userInDB);

    if (userInDB && userInDB.total > 0) {
        return {
            code: 1001,
            msg: '用户名已存在'
        }
    } else {

        user.password = encryptPwd(user.password)
        user.register_at = new Date().getTime()
        user.register_ip = context.CLIENTIP

        let addRes = await userCollection.add(user)
        console.log('addRes', addRes);
        if (addRes.id || addRes.affectedDocs === 1) {
            return {
                code: 0,
                msg: '注册成功'
            }
        }
    }
    return {
        code: 0,
        msg: 'success'
    }

}

export default register
