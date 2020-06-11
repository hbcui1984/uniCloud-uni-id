const db = uniCloud.database();
const userCollect = db.collection('users')

async function logout(user, context) {
    const userInDB = await userCollect.where({
        username: user.username
    }).limit(1).get()


    console.log('userInDB:', userInDB);


    if (userInDB && userInDB.data && userInDB.data.length > 0) {

        let pwdInDB = userInDB.data[0].password

        if (user.password == pwdInDB) {


            try {
                await userCollect.doc(userInDB.data[0]._id).update({
                    last_login_ip: context.CLIENTIP
                });

                console.log('upRes', upRes);

                return {
                    code: 0,
                    msg: '登录成功'
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

module.exports = logout
