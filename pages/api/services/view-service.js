import viewRepository from '../repositories/view-repository';
import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';

import {decrypt} from './crypto-service';

const viewService = async ({id, key, iv, hmacKey: clientHmacKey}) => {
	const {message, hmacKey: originalHmacKey, hmacHash: originalHmacHash} = await viewRepository({
		id
	});

	if (originalHmacKey && originalHmacHash) {
			const result = decrypt({
				encryptedMessage: message,
				originalHmacKey,
				originalHmacHash,
				key,
				iv,
				clientHmacKey,
			});
			
			return {
				message: result
			};
	}

	return {
		message
	};

};

export default async args => {
	return withTransactionWrapper(viewService, args);
};
