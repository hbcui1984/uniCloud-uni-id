import crypto from 'crypto'

import {
    passwordSecret
} from './config.json'

function encryptPwd(password) {
	const hmac = crypto.createHmac('sha1', passwordSecret.toString('ascii'));
	hmac.update(password);
	return hmac.digest('hex');
}

export default encryptPwd