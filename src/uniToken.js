import jwt from 'jsonwebtoken'

const tokenSecret = 'your-pwd-sec'


let uniToken = {
    createToken: function(user) {
        var token = jwt.sign({
            uid: user._id
        }, tokenSecret, {
            expiresIn: 2
        });


        return token;

    },

    checkToken: function(token) {
        try {
            var decoded = jwt.verify(token, tokenSecret);
            console.log('decoded', decoded);
            
            // if(decoded.exp < new Date().getTime()){
            //     return {
            //         code: 1302,
            //         msg: 'token已过期'
            //     }
            // }

            
            
            return decoded
        } catch (err) {
            return {
                code: 1301,
                msg: '非法token',
                err:err
            }
        }
    }
}

export default uniToken
