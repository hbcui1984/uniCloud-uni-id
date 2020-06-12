'use strict';

import register from './register.js'
import login from './login.js'
import updatePwd from './updatePwd.js'

exports.main = async (event, context) => {
    //event为客户端上传的参数
    console.log('event : ' + event)

    let res = {}

    switch (event.action) {
        case 'register':
            res = register(event.params, context);
            break;
        case 'login':
            res = login(event.params, context);
            break;
        case 'updatePassword':
            res = updatePwd(event.params, context);
            break;
        default:
            res = {
                code: 403,
                msg: '非法访问'
            }
            break;
    }

    //返回数据给客户端
    return res
};
