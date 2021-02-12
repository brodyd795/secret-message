import crypto from 'crypto';

import {encryptionEnums} from '../../../enums/encryption';

export const encrypt = (message) => {
    const key = crypto.randomBytes(32).toString('hex');
    const iv = crypto.randomBytes(16).toString('hex');

    const hmacKey = crypto.randomBytes(16).toString('hex');
    const hmac = crypto.createHmac(encryptionEnums.HMAC_ALGORITHM, hmacKey);

    hmac.write(message);
    hmac.end();
    const hmacHash = hmac.read().toString('hex');

    const cipher = crypto.createCipheriv(encryptionEnums.CIPHER_ALGORITHM, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    const encryptedMessage = Buffer.concat([cipher.update(message), cipher.final()]);
    const encryptedMessageString = encryptedMessage.toString('hex');

    return {
        key,
        iv,
        hmacKey,
        hmacHash,
        encryptedMessage: encryptedMessageString
    };
};

export const decrypt = (data) => {
    const {
        encryptedMessage,
        originalHmacKey,
        originalHmacHash,
        key,
        iv,
        clientHmacKey
    } = data;

    const encryptedText = Buffer.from(encryptedMessage, 'hex');
    const decipher = crypto.createDecipheriv(encryptionEnums.CIPHER_ALGORITHM, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    const decryptedString = decrypted.toString();

    const hmac = crypto.createHmac(encryptionEnums.HMAC_ALGORITHM, clientHmacKey);

    hmac.write(decryptedString);
    hmac.end();
    const newHash = hmac.read().toString('hex');

    const doHmacsMatch = newHash === originalHmacHash;
    const doHmacKeysMatch = clientHmacKey === originalHmacKey;

    if (doHmacsMatch && doHmacKeysMatch) {
        return decryptedString;
    }

    return 'Something went wrong';
};
