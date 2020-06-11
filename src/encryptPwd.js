import crypto from 'crypto'

const passSecret = 'your-pwd-sec'

function encryptPwd(password) {
	const hmac = crypto.createHmac('sha1', 'passSecret'.toString('ascii'));
	hmac.update(password);
	return hmac.digest('hex');
}

export default encryptPwd