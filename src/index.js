'use strict';

import register from './register.js'
import login from './login.js'
import logout from './logout.js'
import updatePwd from './updatePwd.js'
import uniToken from './uniToken.js'

exports.main = async (event, context) => {
    //event为客户端上传的参数
    console.log('event : ' + event)


    let params = event.params
    let res = {}
    
    let payload = {}

    switch (event.action) {
        case 'register':
            res = register(event.params, context);
            break;
        case 'login':
            res = login(event.params, context);
            break;
        case 'logout':
            payload = uniToken.checkToken(event.uniIdToken)
            console.log('index::payload:', payload);

            if (payload.code && payload.code > 0) {
                return payload
            }
            res = logout(payload.uid, context);
            break;
        case 'updatePassword':
            payload = uniToken.checkToken(event.uniIdToken)
            console.log('index::payload:', payload);

            if (payload.code && payload.code > 0) {
                return payload
            }
            params.uid = payload.uid

            res = updatePwd(params, context);
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
