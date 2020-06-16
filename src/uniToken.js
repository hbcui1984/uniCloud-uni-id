import jwt from 'jsonwebtoken'
import userCollection from './init.js'
import {
    tokenSecret
} from './config.json'

// const tokenSecret = 'your-pwd-sec'

console.log(tokenSecret);

let uniToken = {
    createToken: function(user) {
        var token = jwt.sign({
            uid: user._id
        }, tokenSecret, {
            expiresIn: 60 * 60
        });


        return token;

    },
    refreshToken: function() {
        // TODO 
    },

    checkToken: function(token) {
        try {
            let payload = jwt.verify(token, tokenSecret);

            const userInDB = await userCollection.doc(payload.uid).get()

            if (userInDB.data && userInDB.data.length > 0 && userInDB.data[0].token !== token) {
                return {
                    code: 1302,
                    msg: 'token不合法，请重新登录'
                }
            }

            console.log('checkToken payload', payload);

            return payload
        } catch (err) {
            console.log('checkToken 3', err);
            return {
                code: 1301,
                msg: '非法token',
                err: err
            }
        }
    }
}

export default uniToken
