import { v4 as uuidv4 } from 'uuid';

import postMessageRepository from '../repositories/post-message-repository';
import {withTransactionWrapper} from '../repositories/transaction-wrapper-repository';

const postMessageService = async (args) => {
	const guid = uuidv4();

	await postMessageRepository({
		...args,
		guid
	});

	return guid;
};

export default async args => {
	return withTransactionWrapper(postMessageService, args);
};
