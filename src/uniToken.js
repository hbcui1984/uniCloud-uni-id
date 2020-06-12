import jwt from 'jsonwebtoken'
import {
    tokenSecret
} from './config.json'


// const tokenSecret = 'your-pwd-sec'
console.log(tokenSecret);

// let tokenSecret = ""

let uniToken = {
    createToken: function(user) {
        var token = jwt.sign({
            uid: user._id
        }, tokenSecret, {
            expiresIn: 2
        });


        return token;

    },
    refreshToken: function() {
        // TODO 
    },

    checkToken: function(token) {
        try {
            var decoded = jwt.verify(token, tokenSecret);
            console.log('decoded', decoded);

            return decoded
        } catch (err) {
            return {
                code: 1301,
                msg: '非法token',
                err: err
            }
        }
    }
}

export default uniToken
