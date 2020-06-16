import jwt from 'jsonwebtoken'
// import {
//     tokenSecret
// } from './config.json'

const tokenSecret = 'your-pwd-sec'

console.log(tokenSecret);

let uniToken = {
    createToken: function(user) {
        var token = jwt.sign({
            uid: user._id
        }, tokenSecret, {
            expiresIn: 60*60
        });


        return token;

    },
    refreshToken: function() {
        // TODO 
    },

    checkToken: function(token) {
        try {
            console.log('checkToken 1');
            var decoded = jwt.verify(token, tokenSecret);
            console.log('checkToken 2');
            console.log('decoded', decoded);

            return decoded
        } catch (err) {
            console.log('checkToken 3',err);
            return {
                code: 1301,
                msg: '非法token',
                err: err
            }
        }
    }
}

export default uniToken
