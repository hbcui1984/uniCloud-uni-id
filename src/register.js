const db = uniCloud.database();

import encryptPwd from './encryptPwd.js'

async function register(user,context) {
    const userInDB = await db.collection('users').where({
        username: user.username
    }).count()


    console.log('userInDB:', userInDB);

    if (userInDB && userInDB.total > 0) {
        return {
            code: 1001,
            msg: '用户名已存在'
        }
    } else {

        user.register_ip = context.CLIENTIP
        user.password = encryptPwd(user.password)
        
        let addRes = await db.collection('users').add(user)
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
