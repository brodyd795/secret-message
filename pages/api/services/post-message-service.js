import { v4 as uuidv4 } from 'uuid';

import postMessageRepository from '../repositories/post-message-repository';
import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';

import { encrypt } from './crypto-service';

const postMessageService = async ({message, isSelfDestructChecked}) => {
	const guid = uuidv4();

	const {hmacKey, hmacHash, encryptedMessage, key, iv} = encrypt(message);

	await postMessageRepository({
		isSelfDestructChecked,
		guid,
		hmacHash,
		hmacKey,
		encryptedMessage
	});

	return {
		guid,
		key,
		iv,
		hmacKey,
		hmacHash
	};
};

export default async args => {
	return withTransactionWrapper(postMessageService, args);
};
